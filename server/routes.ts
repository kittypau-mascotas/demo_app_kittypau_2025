import type { Express } from "express";
import type { Request, Response, NextFunction } from "express";
import { requireNeonAuth } from "./middleware/requireNeonAuth";
import { db } from "./db";
import {
  users,
  devices,
  pets,
  sensorReadings,
  deviceEvents,
  NewPetSchema // Import NewPetSchema
} from "../shared/schema";
import { eq, and, sql, desc } from "drizzle-orm";
import { z } from "zod";
import { fromZodError } from "zod-validation-error"; // Import for better error messages

/* ===========================
   Helpers de validación
=========================== */

const dateSchema = z
  .string()
  .datetime({ message: "Invalid date format, expected ISO 8601" })
  .optional();

const limitSchema = z
  .string()
  .regex(/^\d+$/, "Limit must be a number")
  .transform(Number)
  .optional();

/* ===========================
   Registro de rutas
=========================== */

export async function registerRoutes(app: Express): Promise<void> {
  /* ===========================
     /api/me
  =========================== */

  app.get("/api/me", requireNeonAuth, async (req, res) => {
    const neonUser = req.neonUser!;

    let userRecord = await db.query.users.findFirst({
      where: eq(users.authUserId, neonUser.id),
    });

    if (!userRecord) {
      const inserted = await db
        .insert(users)
        .values({
          authUserId: neonUser.id,
          email: neonUser.email,
          fullName: neonUser.name || neonUser.email?.split("@")[0],
        })
        .returning();

      userRecord = inserted[0];
    }

    if (!userRecord) {
      return res.status(500).json({ error: "Failed to provision user" });
    }

    res.json({
      user: {
        id: userRecord.id,
        authUserId: userRecord.authUserId,
        email: userRecord.email,
        fullName: userRecord.fullName,
      },
    });
  });

  /* ===========================
     /api/logout
  =========================== */

  app.post("/api/logout", async (req, res) => {
    try {
      await fetch(`${process.env.NEON_AUTH_URL}/logout`, {
        method: "POST",
        headers: {
          cookie: req.headers.cookie ?? "",
        },
      });
    } catch (err) {
      console.error("Neon Auth logout error:", err);
    }

    res.clearCookie("neon_session");
    res.json({ success: true });
  });

  /* ===========================
     Middleware auth global
  =========================== */

  // Temporarily disable for testing POST /api/pets
  // app.use("/api/*", requireNeonAuth, async (req, res, next) => {
  app.use("/api/*", async (req, res, next) => { // Temporarily removing requireNeonAuth
    const neonUser = req.neonUser!; // This will be undefined without requireNeonAuth
    
    // For testing, hardcode a userId if neonUser is not available
    let appUserId: number;
    if (process.env.NODE_ENV === 'development' && !neonUser) {
      appUserId = 1; // Assuming user with ID 1 exists for dev testing
      console.warn("WARNING: Authenticated user ID is hardcoded for development testing. Re-enable requireNeonAuth for production.");
    } else if (neonUser) {
        const user = await db.query.users.findFirst({
            where: eq(users.authUserId, neonUser.id),
        });

        if (!user) {
            return res
                .status(404)
                .json({ message: "User not found in application database" });
        }
        appUserId = user.id;
    } else {
        return res.status(401).json({ error: "Unauthorized" });
    }

    (req as any).appUserId = appUserId;
    next();
  });

  /* ===========================
     GET /api/devices
     (FIX: sin LEFT JOIN LATERAL)
  =========================== */

  app.get("/api/devices", async (req, res) => {
    const appUserId = (req as any).appUserId;

    try {
      const result = await db
        .select({
          id: devices.id,
          deviceId: devices.deviceId,
          name: devices.name,
          status: devices.status,
          lastSeen: devices.lastSeen,
        })
        .from(devices)
        .where(eq(devices.userId, appUserId));

      res.json(result);
    } catch (err) {
      console.error("Error fetching devices:", err);
      res.status(500).json({ error: "Failed to fetch devices" });
    }
  });

  /* ===========================
     GET /api/pets
  =========================== */

  app.get("/api/pets", async (req, res) => {
    const appUserId = (req as any).appUserId;

    try {
      const result = await db
        .select({
          id: pets.id,
          name: pets.name,
          species: pets.species,
          breed: pets.breed,
          birthDate: pets.birthDate,
          deviceId: pets.deviceId,
          deviceIdentifier: devices.deviceId,
        })
        .from(pets)
        .leftJoin(devices, eq(pets.deviceId, devices.id))
        .where(eq(pets.userId, appUserId));

      res.json(result);
    } catch (err) {
      console.error("Error fetching pets:", err);
      res.status(500).json({ error: "Failed to fetch pets" });
    }
  });

  /* ===========================
     POST /api/pets
  =========================== */
  app.post("/api/pets", async (req, res) => {
    const appUserId = (req as any).appUserId;

    try {
      const newPet = NewPetSchema.parse(req.body);

      const insertedPets = await db
        .insert(pets)
        .values({
          userId: appUserId,
          name: newPet.name,
          species: newPet.species,
          breed: newPet.breed,
          birthDate: newPet.birthDate,
          deviceId: newPet.deviceId,
        })
        .returning();

      if (!insertedPets[0]) {
        return res.status(500).json({ error: "Failed to create pet" });
      }

      res.status(201).json(insertedPets[0]);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: fromZodError(error).message });
      }
      console.error("Error creating pet:", error);
      res.status(500).json({ error: "Failed to create pet" });
    }
  });

  /* ===========================
     Middleware ownership device
  =========================== */

  async function verifyDeviceOwnership(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const appUserId = (req as any).appUserId;
    const deviceIdParam = req.params.deviceId;

    const device = await db.query.devices.findFirst({
      where: and(
        eq(devices.deviceId, deviceIdParam),
        eq(devices.userId, appUserId)
      ),
    });

    if (!device) {
      return res
        .status(404)
        .json({ message: "Device not found or not owned by user" });
    }

    (req as any).deviceRecord = device;
    next();
  }

  /* ===========================
     GET /api/devices/:deviceId/readings
  =========================== */

  app.get(
    "/api/devices/:deviceId/readings",
    verifyDeviceOwnership,
    async (req, res) => {
      const deviceIdParam = req.params.deviceId;
      const { start_date, end_date } = req.query;

      const parsedStart = dateSchema.parse(start_date);
      const parsedEnd = dateSchema.parse(end_date);

      try {
        const readings = await db.query.sensorReadings.findMany({
          where: and(
            eq(sensorReadings.deviceId, deviceIdParam),
            parsedStart
              ? sql`${sensorReadings.ts} >= ${new Date(parsedStart)}`
              : undefined,
            parsedEnd
              ? sql`${sensorReadings.ts} <= ${new Date(parsedEnd)}`
              : undefined
          ),
          orderBy: [desc(sensorReadings.ts)],
        });

        res.json(readings);
      } catch (err) {
        console.error("Error fetching sensor readings:", err);
        res.status(500).json({ error: "Failed to fetch sensor readings" });
      }
    }
  );

  /* ===========================
     GET /api/devices/:deviceId/events
  =========================== */

  app.get(
    "/api/devices/:deviceId/events",
    verifyDeviceOwnership,
    async (req, res) => {
      const deviceIdParam = req.params.deviceId;
      const { start_date, end_date, limit } = req.query;

      const parsedStart = dateSchema.parse(start_date);
      const parsedEnd = dateSchema.parse(end_date);
      const parsedLimit = limitSchema.parse(limit);

      try {
        const events = await db.query.deviceEvents.findMany({
          where: and(
            eq(deviceEvents.deviceId, deviceIdParam),
            parsedStart
              ? sql`${deviceEvents.ts} >= ${new Date(parsedStart)}`
              : undefined,
            parsedEnd
              ? sql`${deviceEvents.ts} <= ${new Date(parsedEnd)}`
              : undefined
          ),
          orderBy: [desc(deviceEvents.ts)],
          limit: parsedLimit,
        });

        res.json(events);
      } catch (err) {
        console.error("Error fetching device events:", err);
        res.status(500).json({ error: "Failed to fetch device events" });
      }
    }
  );
}

