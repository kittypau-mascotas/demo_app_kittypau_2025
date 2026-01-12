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
  NewPetSchema // This can be removed in a later step if not used
} from "../shared/schema";
import { eq, and, sql, desc } from "drizzle-orm";
import { z } from "zod";

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

  app.use("/api/*", requireNeonAuth, async (req, res, next) => {
    const neonUser = req.neonUser!;

    const user = await db.query.users.findFirst({
      where: eq(users.authUserId, neonUser.id),
    });

    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found in application database" });
    }

    (req as any).appUserId = user.id;
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
    const { name, species, breed, birthDate, deviceId } = req.body;

    if (!name || !species) {
      return res.status(400).json({ error: "Name and species are required" });
    }

    try {
      const [newPet] = await db
        .insert(pets)
        .values({
          userId: appUserId,
          name,
          species,
          breed,
          birthDate: birthDate || null,
          deviceId: deviceId || null,
        })
        .returning();

      res.status(201).json(newPet);
    } catch (error) {
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

