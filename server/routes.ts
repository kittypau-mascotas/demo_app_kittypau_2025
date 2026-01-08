import type { Express } from "express";
import { requireNeonAuth } from "./middleware/requireNeonAuth";
import { db } from "./db";
import { users, devices, pets, sensorReadings, deviceEvents } from "../shared/schema";
import { eq, and, sql, desc, inArray } from "drizzle-orm"; // Import necessary Drizzle functions
import { z } from "zod"; // For query parameter validation

// Helper to validate date strings
const dateSchema = z.string().datetime({ message: "Invalid date format, expected ISO 8601" }).optional();
const limitSchema = z.string().regex(/^\d+$/, "Limit must be a number").transform(Number).optional();

export async function registerRoutes(app: Express): Promise<void> {

  // Endpoint /api/me (fetch user profile) - Adjusted for new schema
  app.get("/api/me", requireNeonAuth, async (req, res) => {
    const neonUser = req.neonUser!; // Injected by requireNeonAuth middleware

    // Try to find the user in our DB using the authUserId from NeonAuth
    let userRecord = await db.query.users.findFirst({
      where: eq(users.authUserId, neonUser.id),
    });

    // If user profile does not exist in our DB, create it (just-in-time provisioning)
    if (!userRecord) {
      const insertedUsers = await db
        .insert(users)
        .values({
          authUserId: neonUser.id,
          email: neonUser.email,
          fullName: neonUser.name || neonUser.email?.split('@')[0],
          // No role field in new schema, householdId is also gone.
        })
        .returning();
      userRecord = insertedUsers[0];
    }

    if (!userRecord) {
      console.error(`Failed to provision user for Neon Auth ID: ${neonUser.id}`);
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

  // Endpoint /api/logout (invalidate Neon Auth session)
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

  // --- New API Endpoints based on the refactored schema ---

  // Middleware to find userId from authUserId
  app.use("/api/*", requireNeonAuth, async (req, res, next) => {
    const neonUser = req.neonUser!;
    const user = await db.query.users.findFirst({
      where: eq(users.authUserId, neonUser.id),
    });

    if (!user) {
      return res.status(404).json({ message: "User not found in application database." });
    }
    (req as any).appUserId = user.id; // Attach our internal user ID to the request
    next();
  });

  // GET /api/devices - Get all devices for the authenticated user
  app.get("/api/devices", async (req, res) => {
    const appUserId = (req as any).appUserId;

    try {
      const devicesWithLastEvent = await db
        .select({
          id: devices.id,
          deviceId: devices.deviceId,
          name: devices.name,
          status: devices.status,
          lastSeen: devices.lastSeen,
          lastEventAt: sql<Date>`${deviceEvents.ts}`.as('last_event_at'), // Select the ts from the lateral join
        })
        .from(devices)
        .leftJoin(
          sql`LATERAL (
            SELECT ${deviceEvents.ts}
            FROM ${deviceEvents}
            WHERE ${deviceEvents.deviceId} = ${devices.deviceId}
            ORDER BY ${deviceEvents.ts} DESC
            LIMIT 1
          ) AS last_event ON TRUE`
        )
        .where(eq(devices.userId, appUserId));

      res.json(devicesWithLastEvent);
    } catch (error) {
      console.error("Error fetching devices:", error);
      res.status(500).json({ message: "Error fetching devices" });
    }
  });

  // GET /api/pets - Get all pets for the authenticated user
  app.get("/api/pets", async (req, res) => {
    const appUserId = (req as any).appUserId;

    try {
      const petsWithDevices = await db
        .select({
          id: pets.id,
          name: pets.name,
          species: pets.species,
          breed: pets.breed,
          birthDate: pets.birthDate,
          deviceId: pets.deviceId, // Our internal DB device ID
          deviceIdentifier: devices.deviceId, // The string ID from MQTT
        })
        .from(pets)
        .leftJoin(devices, eq(pets.deviceId, devices.id))
        .where(eq(pets.userId, appUserId));

      res.json(petsWithDevices);
    } catch (error) {
      console.error("Error fetching pets:", error);
      res.status(500).json({ message: "Error fetching pets" });
    }
  });


  // Middleware to verify device ownership
  async function verifyDeviceOwnership(req: Express.Request, res: Express.Response, next: Express.NextFunction) {
    const appUserId = (req as any).appUserId;
    const deviceIdParam = req.params.deviceId; // This is the device_id string from MQTT

    if (!deviceIdParam) {
      return res.status(400).json({ message: "Device ID parameter is missing." });
    }

    const device = await db.query.devices.findFirst({
      where: and(eq(devices.deviceId, deviceIdParam), eq(devices.userId, appUserId)),
    });

    if (!device) {
      return res.status(404).json({ message: "Device not found or not owned by user." });
    }
    (req as any).deviceRecord = device; // Attach the full device record for later use
    next();
  }

  // GET /api/devices/:deviceId/readings - Get sensor readings for a specific device
  app.get("/api/devices/:deviceId/readings", verifyDeviceOwnership, async (req, res) => {
    const deviceIdParam = req.params.deviceId; // MQTT device_id string
    const { start_date, end_date } = req.query;

    const parsedStartDate = dateSchema.parse(start_date);
    const parsedEndDate = dateSchema.parse(end_date);

    try {
      const readings = await db.query.sensorReadings.findMany({
        where: and(
          eq(sensorReadings.deviceId, deviceIdParam),
          parsedStartDate ? sql`${sensorReadings.ts} >= ${new Date(parsedStartDate)}` : undefined,
          parsedEndDate ? sql`${sensorReadings.ts} <= ${new Date(parsedEndDate)}` : undefined,
        ),
        orderBy: [desc(sensorReadings.ts)],
      });

      res.json(readings);
    } catch (error) {
      console.error(`Error fetching sensor readings for device ${deviceIdParam}:`, error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid date format in query parameters.", errors: error.errors });
      }
      res.status(500).json({ message: "Error fetching sensor readings" });
    }
  });

  // GET /api/devices/:deviceId/events - Get device events for a specific device
  app.get("/api/devices/:deviceId/events", verifyDeviceOwnership, async (req, res) => {
    const deviceIdParam = req.params.deviceId; // MQTT device_id string
    const { start_date, end_date, limit } = req.query;

    const parsedStartDate = dateSchema.parse(start_date);
    const parsedEndDate = dateSchema.parse(end_date);
    const parsedLimit = limitSchema.parse(limit);

    try {
      const events = await db.query.deviceEvents.findMany({
        where: and(
          eq(deviceEvents.deviceId, deviceIdParam),
          parsedStartDate ? sql`${deviceEvents.ts} >= ${new Date(parsedStartDate)}` : undefined,
          parsedEndDate ? sql`${deviceEvents.ts} <= ${new Date(parsedEndDate)}` : undefined,
        ),
        orderBy: [desc(deviceEvents.ts)],
        limit: parsedLimit,
      });

      res.json(events);
    } catch (error) {
      console.error(`Error fetching device events for device ${deviceIdParam}:`, error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid query parameter format.", errors: error.errors });
      }
      res.status(500).json({ message: "Error fetching device events" });
    }
  });
}