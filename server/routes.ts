import type { Express, Request, Response, NextFunction } from "express";
import { auth } from "./auth/neonAuth";
import { db } from "./db";
import {
  users,
  devices,
  pets,
  sensorReadings,
  deviceEvents,
} from "../shared/schema";
import { eq, and, sql, desc } from "drizzle-orm";
import { z } from "zod";

/* ======================================================
   Tipado Express extendido
====================================================== */
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
        name?: string | null;
      };
      appUserId?: number;
      deviceRecord?: any;
    }
  }
}

/* ======================================================
   Schemas
====================================================== */
const NewDeviceSchema = z.object({
  deviceId: z.string().min(1),
  name: z.string().min(1),
  deviceType: z.string().min(1),
  mqttTopic: z.string().min(1),
});

const LinkDeviceToPetSchema = z.object({
  deviceId: z.number().nullable().optional(),
});

const NewTelemetrySchema = z.object({
  deviceId: z.string().min(1),
  sensorType: z.enum([
    "temperatureCelsius",
    "humidityPercent",
    "lightLux",
    "weightGrams",
  ]),
  value: z.number(),
  ts: z
    .string()
    .datetime()
    .optional()
    .transform((v) => (v ? new Date(v) : new Date())),
});

const dateSchema = z.string().datetime().optional();
const limitSchema = z
  .string()
  .regex(/^\d+$/)
  .transform(Number)
  .optional();

/* ======================================================
   Helpers
====================================================== */
function toWebHeaders(
  nodeHeaders: import("http").IncomingHttpHeaders
): Headers {
  const headers = new Headers();
  for (const [k, v] of Object.entries(nodeHeaders)) {
    if (typeof v === "string") headers.append(k, v);
    if (Array.isArray(v)) v.forEach((x) => headers.append(k, x));
  }
  return headers;
}

/* ======================================================
   Middleware Auth
====================================================== */
const requireAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const session = await auth.api.getSession({
      headers: toWebHeaders(req.headers),
    });

    if (!session) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    req.user = session.user;
    next();
  } catch (err) {
    console.error("Auth error:", err);
    res.status(500).json({ error: "Auth failure" });
  }
};

/* ======================================================
   Register Routes
====================================================== */
export async function registerRoutes(app: Express) {
  /* =========================
     PUBLIC ROUTES
  ========================= */

  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok" });
  });

  app.get("/api/diagnostic", async (_req, res) => {
    try {
      const result = await db.execute(sql`SELECT now()`);
      res.json({
        env: {
          DATABASE_URL: !!process.env.DATABASE_URL,
          AUTH_SECRET: !!process.env.AUTH_SECRET,
          NODE_ENV: process.env.NODE_ENV,
        },
        db: {
          connected: true,
          now: (result.rows[0] as any).now,
        },
      });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  /* =========================
     AUTH + USER PROVISION
  ========================= */

  app.use("/api", requireAuth, async (req, res, next) => {
    if (!req.user) return res.status(401).json({ error: "Unauthorized" });

    let user = await db.query.users.findFirst({
      where: eq(users.authUserId, req.user.id),
    });

    if (!user) {
      const [created] = await db
        .insert(users)
        .values({
          authUserId: req.user.id,
          email: req.user.email,
          fullName:
            req.user.name ?? req.user.email.split("@")[0],
        })
        .returning();

      user = created;
    }

    req.appUserId = user.id;
    next();
  });

  /* =========================
     AUTH ROUTES
  ========================= */

  app.get("/api/me", (req, res) => {
    res.json({ user: req.user });
  });

  app.post("/api/logout", async (req, res) => {
    await auth.api.signOut({ headers: toWebHeaders(req.headers) });
    res.json({ success: true });
  });

  /* =========================
     DEVICES
  ========================= */

  app.get("/api/devices", async (req, res) => {
    const devicesList = await db.query.devices.findMany({
      where: eq(devices.userId, req.appUserId!),
    });
    res.json(devicesList);
  });

  app.post("/api/devices", async (req, res) => {
    const parsed = NewDeviceSchema.parse(req.body);
    const [device] = await db
      .insert(devices)
      .values({
        ...parsed,
        userId: req.appUserId!,
        status: "offline",
      })
      .returning();

    res.status(201).json(device);
  });

  /* =========================
     PETS
  ========================= */

  app.get("/api/pets", async (req, res) => {
    const result = await db
      .select({
        id: pets.id,
        name: pets.name,
        species: pets.species,
        deviceId: pets.deviceId,
        deviceIdentifier: devices.deviceId,
      })
      .from(pets)
      .leftJoin(devices, eq(pets.deviceId, devices.id))
      .where(eq(pets.userId, req.appUserId!));

    res.json(result);
  });

  app.post("/api/pets", async (req, res) => {
    const { name, species, breed, birthDate } = req.body;

    const [pet] = await db
      .insert(pets)
      .values({
        userId: req.appUserId!,
        name,
        species,
        breed,
        birthDate: birthDate ?? null,
      })
      .returning();

    res.status(201).json(pet);
  });

  app.patch("/api/pets/:petId", async (req, res) => {
    const petId = Number(req.params.petId);
    const { deviceId } = LinkDeviceToPetSchema.parse(req.body);

    const pet = await db.query.pets.findFirst({
      where: and(eq(pets.id, petId), eq(pets.userId, req.appUserId!)),
    });

    if (!pet) return res.status(404).json({ error: "Pet not found" });

    const [updated] = await db
      .update(pets)
      .set({ deviceId })
      .where(eq(pets.id, petId))
      .returning();

    res.json(updated);
  });

  /* =========================
     TELEMETRY
  ========================= */

  app.get("/api/telemetry", async (req, res) => {
    const readings = await db.query.sensorReadings.findMany({
      orderBy: [desc(sensorReadings.ts)],
      limit: 100,
    });
    res.json(readings);
  });

  app.post("/api/telemetry", async (req, res) => {
    const parsed = NewTelemetrySchema.parse(req.body);

    const [row] = await db
      .insert(sensorReadings)
      .values({
        deviceId: parsed.deviceId,
        ts: parsed.ts,
        ...(parsed.sensorType === "temperatureCelsius" && {
          temperatureCelsius: parsed.value.toString(),
        }),
        ...(parsed.sensorType === "humidityPercent" && {
          humidityPercent: parsed.value.toString(),
        }),
        ...(parsed.sensorType === "lightLux" && {
          lightLux: parsed.value,
        }),
        ...(parsed.sensorType === "weightGrams" && {
          weightGrams: parsed.value.toString(),
        }),
      })
      .returning();

    res.status(201).json(row);
  });
}
