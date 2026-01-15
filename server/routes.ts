import type { Express } from "express";
import type { Request, Response, NextFunction } from "express";
import { auth } from "./auth/neonAuth"; // Import auth from neonAuth.ts
import { db } from "./db";
import {
  users,
  devices,
  pets,
  sensorReadings,
  deviceEvents
} from "../shared/schema";
import { eq, and, sql, desc } from "drizzle-orm";
import { z } from "zod";

/* ===========================
   Helpers de validación
=========================== */

const NewDeviceSchema = z.object({
  deviceId: z.string().min(1, "Device ID is required"),
  name: z.string().min(1, "Name is required"),
  deviceType: z.string().min(1, "Device type is required"),
  mqttTopic: z.string().min(1, "MQTT topic is required"),
});

const LinkDeviceToPetSchema = z.object({
  deviceId: z.string().uuid("Invalid deviceId format").nullable().optional(), // Allow null to unlink
});

const NewTelemetrySchema = z.object({
  deviceId: z.string().uuid("Invalid deviceId format"),
  sensorType: z.enum(["temperatureCelsius", "humidityPercent", "lightLux", "weightGrams"]),
  value: z.number(),
  ts: z.string().datetime({ message: "Invalid date format, expected ISO 8601" }).optional().transform((str) => str ? new Date(str) : new Date()),
});

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
     Ruta de diagnóstico
  =========================== */
  app.get("/api/diagnostic", async (req, res) => {
    try {
      // 1. Verificar variables críticas
      const hasDbUrl = !!process.env.DATABASE_URL;
      const hasAuthSecret = !!process.env.AUTH_SECRET;
      
      // 2. Probar conexión simple a Neon con un query usando `sql` de drizzle-orm
      // Nota: db.execute es la forma de ejecutar un raw query en Drizzle
      const result = await db.execute(sql`SELECT now()`);
      
      res.json({
        status: "ok",
        env: {
          DATABASE_URL_exists: hasDbUrl,
          AUTH_SECRET_exists: hasAuthSecret,
          NODE_ENV: process.env.NODE_ENV,
        },
        db: {
          connected: true,
          now: (result.rows[0] as any).now,
        },
      });
    } catch (error: any) {
      console.error("Error en /api/diagnostic:", error);
      res.status(500).json({
        status: "error",
        message: error.message,
        stack: error.stack,
      });
    }
  });

  /* ===========================
     Middleware auth global para /api
  =========================== */
  app.use("/api", auth.requireAuth, async (req, res, next) => {
    if (!req.user) {
      // Esto realmente no debería ejecutarse si auth.requireAuth funciona correctamente
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Aquí manejamos la lógica de provisionamiento del usuario en nuestra DB de aplicación
    // si aún no existe, y seteamos req.appUserId
    let userRecord = await db.query.users.findFirst({
      where: eq(users.authUserId, req.user.id),
    });

    if (!userRecord) {
      // Provisión del usuario si no existe en nuestra DB
      const inserted = await db
        .insert(users)
        .values({
          authUserId: req.user.id,
          email: req.user.email,
          fullName: req.user.name || req.user.email?.split("@")[0],
        })
        .returning();
      userRecord = inserted[0];
    }

    if (!userRecord) {
      return res.status(500).json({ error: "Failed to provision user in app DB" });
    }

    req.appUserId = userRecord.id;
    next();
  });


  /* ===========================
     /api/me (Simplificado)
  =========================== */
  app.get("/api/me", (req, res) => {
    // req.user ya está disponible gracias al middleware auth.requireAuth
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    res.json({
      id: req.user.id,
      email: req.user.email,
      name: req.user.name,
    });
  });

  /* ===========================
     /api/logout
  =========================== */

  app.post("/api/logout", auth.logout(), (req, res) => {
    res.json({ success: true });
  });

  /* ===========================
     GET /api/devices
     (FIX: sin LEFT JOIN LATERAL)
  =========================== */

  app.get("/api/devices", async (req, res) => {
    const appUserId = req.appUserId;

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
    const appUserId = req.appUserId;

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
    const appUserId = req.appUserId;
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
     PATCH /api/pets/:petId
  =========================== */
  app.patch("/api/pets/:petId", async (req, res) => {
    const appUserId = req.appUserId;
    const petIdParam = req.params.petId;

    const petId = Number(petIdParam);
    if (Number.isNaN(petId)) {
      return res.status(400).json({ message: "Invalid petId" });
    }

    try {
      const { deviceId } = LinkDeviceToPetSchema.parse(req.body);

      // Validate pet ownership
      const existingPet = await db.query.pets.findFirst({
        where: and(eq(pets.id, petId), eq(pets.userId, appUserId)),
      });

      if (!existingPet) {
        return res.status(404).json({ error: "Pet not found or not owned by user" });
      }

      let deviceToLink = null;
      if (deviceId) {
        // Validate device ownership
        deviceToLink = await db.query.devices.findFirst({
          where: and(eq(devices.id, Number(deviceId)), eq(devices.userId, appUserId)),
        });

        if (!deviceToLink) {
          return res.status(404).json({ error: "Device not found or not owned by user" });
        }
      }
      
      const [updatedPet] = await db
        .update(pets)
        .set({ deviceId: deviceId ? Number(deviceId) : null })
        .where(eq(pets.id, Number(petId)))
        .returning();

      res.status(200).json(updatedPet);

    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      console.error("Error linking device to pet:", error);
      res.status(500).json({ error: "Failed to link device to pet" });
    }
  });

  /* ===========================
     GET /api/telemetry
  =========================== */
  app.get("/api/telemetry", async (req, res) => {
    const appUserId = req.appUserId;
    const { petId, start_date, end_date, limit } = req.query;

    const parsedStart = dateSchema.parse(start_date);
    const parsedEnd = dateSchema.parse(end_date);
    const parsedLimit = limitSchema.parse(limit);

    try {
      let targetDeviceIds: string[] = [];

      if (petId) {
        const petIdNum = Number(petId);
        if (Number.isNaN(petIdNum)) {
          return res.status(400).json({ message: "Invalid petId" });
        }
        // Validate pet ownership and get deviceId
        const pet = await db.query.pets.findFirst({
          where: and(eq(pets.id, petIdNum), eq(pets.userId, appUserId)),
        });

        if (!pet) {
          return res.status(404).json({ error: "Pet not found or not owned by user" });
        }
        if (pet.deviceId) {
          targetDeviceIds.push(pet.deviceId.toString());
        } else {
          return res.status(200).json([]); // Pet has no device, return empty readings
        }
      } else {
        // Get all deviceIds for the user
        const userDevices = await db.query.devices.findMany({
          where: eq(devices.userId, appUserId),
          columns: {
            deviceId: true,
          },
        });
        targetDeviceIds = userDevices.map(d => d.deviceId);
      }

      if (targetDeviceIds.length === 0) {
        return res.status(200).json([]); // No devices to fetch telemetry from
      }
      
      const readings = await db.query.sensorReadings.findMany({
        where: and(
          sql`${sensorReadings.deviceId} IN ${targetDeviceIds}`,
          parsedStart
            ? sql`${sensorReadings.ts} >= ${new Date(parsedStart)}`
            : undefined,
          parsedEnd
            ? sql`${sensorReadings.ts} <= ${new Date(parsedEnd)}`
            : undefined
        ),
        orderBy: [desc(sensorReadings.ts)],
        limit: parsedLimit,
      });

      res.json(readings);
    } catch (err) {
      console.error("Error fetching telemetry:", err);
      res.status(500).json({ error: "Failed to fetch telemetry" });
    }
  });


  /* ===========================
     POST /api/devices
  =========================== */
  app.post("/api/devices", async (req, res) => {
    const appUserId = req.appUserId;

    try {
      const parsedDevice = NewDeviceSchema.parse(req.body);

      const [newDevice] = await db
        .insert(devices)
        .values({
          userId: appUserId,
          deviceId: parsedDevice.deviceId,
          name: parsedDevice.name,
          deviceType: parsedDevice.deviceType,
          mqttTopic: parsedDevice.mqttTopic,
          // default status to 'offline' or similar initial state
          status: 'offline', // Assuming a default status for new devices
        })
        .returning();

      res.status(201).json(newDevice);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      console.error("Error creating device:", error);
      res.status(500).json({ error: "Failed to create device" });
    }
  });

  /* ===========================
     POST /api/telemetry
  =========================== */
  app.post("/api/telemetry", async (req, res) => {
    try {
      const parsedTelemetry = NewTelemetrySchema.parse(req.body);

      // Validate that the device exists
      const existingDevice = await db.query.devices.findFirst({
        where: eq(devices.deviceId, parsedTelemetry.deviceId),
      });

      if (!existingDevice) {
        return res.status(404).json({ error: "Device not found" });
      }

      const [newReading] = await db
        .insert(sensorReadings)
        .values({
          deviceId: parsedTelemetry.deviceId,
          ts: parsedTelemetry.ts || new Date(),
          ...(parsedTelemetry.sensorType === "temperatureCelsius" && { temperatureCelsius: parsedTelemetry.value.toString() }),
          ...(parsedTelemetry.sensorType === "humidityPercent" && { humidityPercent: parsedTelemetry.value.toString() }),
          ...(parsedTelemetry.sensorType === "lightLux" && { lightLux: parsedTelemetry.value }),
          ...(parsedTelemetry.sensorType === "weightGrams" && { weightGrams: parsedTelemetry.value.toString() }),
        })
        .returning();

      res.status(201).json(newReading);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      console.error("Error inserting telemetry:", error);
      res.status(500).json({ error: "Failed to insert telemetry" });
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
    // req.appUserId is set by the global auth.requireAuth middleware
    const appUserId = req.appUserId;
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

    req.deviceRecord = device;
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

// Extend the Express Request type to include better-auth's user and appUserId
declare module 'express' {
  export interface Request {
    user?: { // The better-auth user object
      id: string;
      email: string;
      name: string;
    };
    appUserId?: number; // Assuming appUserId is a number
  }
}

