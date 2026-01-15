import type { Express, Request, Response, NextFunction } from "express";
import { z } from "zod";
import { eq, and, sql, desc } from "drizzle-orm";

import { auth } from "./auth/neonAuth";
import { db } from "./db";
import {
  users,
  devices,
  pets,
  sensorReadings,
  deviceEvents,
} from "../shared/schema";

/* -------------------------------------------------------------------------- */
/*                               TYPES EXTENSION                               */
/* -------------------------------------------------------------------------- */
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
        name?: string;
      };
      appUserId?: number;
      deviceRecord?: any;
    }
  }
}

/* -------------------------------------------------------------------------- */
/*                               HELPERS                                      */
/* -------------------------------------------------------------------------- */
function toWebHeaders(
  nodeHeaders: import("http").IncomingHttpHeaders
): Headers {
  const headers = new Headers();
  for (const [k, v] of Object.entries(nodeHeaders)) {
    if (typeof v === "string") headers.append(k, v);
    else if (Array.isArray(v)) v.forEach((x) => headers.append(k, x));
  }
  return headers;
}

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

/* -------------------------------------------------------------------------- */
/*                               ROUTES                                       */
/* -------------------------------------------------------------------------- */
export async function registerRoutes(app: Express): Promise<void> {
  /* ----------------------------- AUTH GLOBAL ------------------------------ */
  app.use("/api", requireAuth);

  /* ----------------------- USER PROVISIONING ------------------------------ */
  app.use("/api", async (req, res, next) => {
    const authUser = req.user!;
    let user = await db.query.users.findFirst({
      where: eq(users.authUserId, authUser.id),
    });

    if (!user) {
      const [created] = await db
        .insert(users)
        .values({
          authUserId: authUser.id,
          email: authUser.email,
          fullName:
            authUser.name ?? authUser.email.split("@")[0],
        })
        .returning();

      user = created;
    }

    req.appUserId = user.id;
    next();
  });

  /* ------------------------------- ME ------------------------------------ */
  app.get("/api/me", (req, res) => {
    res.json({ user: req.user });
  });

  /* ----------------------------- DEVICES --------------------------------- */
  app.get("/api/devices", async (req, res) => {
    const data = await db
      .select()
      .from(devices)
      .where(eq(devices.userId, req.appUserId!));

    res.json(data);
  });

  app.post("/api/devices", async (req, res) => {
    const schema = z.object({
      deviceId: z.string(),
      name: z.string(),
      deviceType: z.string(),
      mqttTopic: z.string(),
    });

    const payload = schema.parse(req.body);

    const [device] = await db
      .insert(devices)
      .values({
        ...payload,
        userId: req.appUserId!,
        status: "offline",
      })
      .returning();

    res.status(201).json(device);
  });

  /* ------------------------------- PETS ---------------------------------- */
  app.get("/api/pets", async (req, res) => {
    const data = await db
      .select()
      .from(pets)
      .where(eq(pets.userId, req.appUserId!));

    res.json(data);
  });

  app.post("/api/pets", async (req, res) => {
    const schema = z.object({
      name: z.string(),
      species: z.string(),
      breed: z.string().optional(),
      birthDate: z.string().optional(),
      deviceId: z.number().nullable().optional(),
    });

    const payload = schema.parse(req.body);

    const [pet] = await db
      .insert(pets)
      .values({
        ...payload,
        userId: req.appUserId!,
      })
      .returning();

    res.status(201).json(pet);
  });

  /* ----------------------------- TELEMETRY -------------------------------- */
  app.get("/api/telemetry", async (req, res) => {
    const readings = await db.query.sensorReadings.findMany({
      orderBy: [desc(sensorReadings.ts)],
      limit: 100,
    });

    res.json(readings);
  });

  app.post("/api/telemetry", async (req, res) => {
    const schema = z.object({
      deviceId: z.string(),
      temperatureCelsius: z.number().optional(),
      humidityPercent: z.number().optional(),
      lightLux: z.number().optional(),
      weightGrams: z.number().optional(),
    });

    const payload = schema.parse(req.body);

    const [row] = await db
      .insert(sensorReadings)
      .values({
        deviceId: payload.deviceId,
        ts: new Date(),
        temperatureCelsius: payload.temperatureCelsius?.toString(),
        humidityPercent: payload.humidityPercent?.toString(),
        lightLux: payload.lightLux,
        weightGrams: payload.weightGrams?.toString(),
      })
      .returning();

    res.status(201).json(row);
  });
}
