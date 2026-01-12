var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// server/index.ts
import "dotenv/config";
import express from "express";

// server/middleware/requireNeonAuth.ts
async function requireNeonAuth(req, res, next) {
  try {
    const response = await fetch(
      `${process.env.NEON_AUTH_URL}/session`,
      {
        headers: {
          cookie: req.headers.cookie ?? ""
        }
      }
    );
    if (!response.ok) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const data = await response.json();
    req.neonUser = {
      id: data.user.id,
      email: data.user.email,
      name: data.user.name
    };
    next();
  } catch (err) {
    console.error("Neon auth error:", err);
    res.status(401).json({ error: "Unauthorized" });
  }
}

// server/db.ts
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

// shared/schema.ts
var schema_exports = {};
__export(schema_exports, {
  deviceEventTypeEnum: () => deviceEventTypeEnum,
  deviceEvents: () => deviceEvents,
  devices: () => devices,
  pets: () => pets,
  sensorReadings: () => sensorReadings,
  users: () => users
});
import { pgTable, serial, varchar, timestamp, integer, date, pgEnum, primaryKey, numeric, jsonb, uuid, index } from "drizzle-orm/pg-core";
var deviceEventTypeEnum = pgEnum("device_event_type", [
  "online",
  "offline",
  "reboot",
  "error",
  "low_battery",
  "sensor_error"
]);
var users = pgTable("users", {
  id: serial("id").primaryKey(),
  authUserId: uuid("auth_user_id").notNull().unique(),
  // From Neon Auth
  email: varchar("email", { length: 255 }).unique(),
  fullName: varchar("full_name", { length: 255 }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow()
});
var devices = pgTable("devices", {
  id: serial("id").primaryKey(),
  deviceId: varchar("device_id", { length: 50 }).notNull().unique(),
  // Physical device ID from MQTT
  userId: integer("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  name: varchar("name", { length: 100 }).notNull().default("Mi Dispositivo KittyPaw"),
  status: varchar("status", { length: 50 }).default("offline"),
  lastSeen: timestamp("last_seen", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow()
}, (table) => {
  return {
    userIdx: index("devices_user_id_idx").on(table.userId)
  };
});
var pets = pgTable("pets", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  deviceId: integer("device_id").unique().references(() => devices.id, { onDelete: "set null" }),
  name: varchar("name", { length: 100 }).notNull(),
  species: varchar("species", { length: 50 }),
  breed: varchar("breed", { length: 100 }),
  birthDate: date("birth_date"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow()
}, (table) => {
  return {
    userIdx: index("pets_user_id_idx").on(table.userId)
  };
});
var deviceEvents = pgTable("device_events", {
  id: serial("id").primaryKey(),
  deviceId: varchar("device_id", { length: 50 }).notNull(),
  // From MQTT, not a FK
  eventType: deviceEventTypeEnum("event_type").notNull(),
  payload: jsonb("payload"),
  ts: timestamp("ts", { withTimezone: true }).defaultNow()
}, (table) => {
  return {
    deviceIdIdx: index("events_device_id_idx").on(table.deviceId),
    timestampIdx: index("events_timestamp_idx").on(table.ts)
  };
});
var sensorReadings = pgTable("sensor_readings", {
  ts: timestamp("ts", { withTimezone: true }).notNull(),
  // Timestamp from device
  receivedAt: timestamp("received_at", { withTimezone: true }).defaultNow(),
  // Timestamp from server
  deviceId: varchar("device_id", { length: 50 }).notNull(),
  // From MQTT, not a FK
  temperatureCelsius: numeric("temperature_celsius", { precision: 5, scale: 2 }),
  humidityPercent: numeric("humidity_percent", { precision: 5, scale: 2 }),
  lightLux: integer("light_lux"),
  weightGrams: numeric("weight_grams", { precision: 8, scale: 2 })
}, (table) => {
  return {
    pk: primaryKey({ columns: [table.deviceId, table.ts] })
  };
});

// server/db.ts
if (process.env.NODE_ENV !== "production") {
}
var databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  throw new Error("DATABASE_URL is not set");
}
var sql = neon(databaseUrl);
var db = drizzle(sql, { schema: schema_exports });

// server/routes.ts
import { eq, and, sql as sql2, desc } from "drizzle-orm";
import { z } from "zod";
var NewDeviceSchema = z.object({
  name: z.string().min(1, "Name is required"),
  deviceType: z.string().min(1, "Device type is required"),
  mqttTopic: z.string().min(1, "MQTT topic is required")
});
var LinkDeviceToPetSchema = z.object({
  deviceId: z.string().uuid("Invalid deviceId format").nullable().optional()
  // Allow null to unlink
});
var NewTelemetrySchema = z.object({
  deviceId: z.string().uuid("Invalid deviceId format"),
  value: z.number(),
  sensorType: z.string().min(1, "Sensor type is required"),
  ts: z.string().datetime({ message: "Invalid date format, expected ISO 8601" }).optional().transform((str) => str ? new Date(str) : /* @__PURE__ */ new Date())
});
var dateSchema = z.string().datetime({ message: "Invalid date format, expected ISO 8601" }).optional();
var limitSchema = z.string().regex(/^\d+$/, "Limit must be a number").transform(Number).optional();
async function registerRoutes(app2) {
  app2.get("/api/me", requireNeonAuth, async (req, res) => {
    const neonUser = req.neonUser;
    let userRecord = await db.query.users.findFirst({
      where: eq(users.authUserId, neonUser.id)
    });
    if (!userRecord) {
      const inserted = await db.insert(users).values({
        authUserId: neonUser.id,
        email: neonUser.email,
        fullName: neonUser.name || neonUser.email?.split("@")[0]
      }).returning();
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
        fullName: userRecord.fullName
      }
    });
  });
  app2.post("/api/logout", async (req, res) => {
    try {
      await fetch(`${process.env.NEON_AUTH_URL}/logout`, {
        method: "POST",
        headers: {
          cookie: req.headers.cookie ?? ""
        }
      });
    } catch (err) {
      console.error("Neon Auth logout error:", err);
    }
    res.clearCookie("neon_session");
    res.json({ success: true });
  });
  app2.use("/api/*", requireNeonAuth, async (req, res, next) => {
    const neonUser = req.neonUser;
    const user = await db.query.users.findFirst({
      where: eq(users.authUserId, neonUser.id)
    });
    if (!user) {
      return res.status(404).json({ message: "User not found in application database" });
    }
    req.appUserId = user.id;
    next();
  });
  app2.get("/api/devices", async (req, res) => {
    const appUserId = req.appUserId;
    try {
      const result = await db.select({
        id: devices.id,
        deviceId: devices.deviceId,
        name: devices.name,
        status: devices.status,
        lastSeen: devices.lastSeen
      }).from(devices).where(eq(devices.userId, appUserId));
      res.json(result);
    } catch (err) {
      console.error("Error fetching devices:", err);
      res.status(500).json({ error: "Failed to fetch devices" });
    }
  });
  app2.get("/api/pets", async (req, res) => {
    const appUserId = req.appUserId;
    try {
      const result = await db.select({
        id: pets.id,
        name: pets.name,
        species: pets.species,
        breed: pets.breed,
        birthDate: pets.birthDate,
        deviceId: pets.deviceId,
        deviceIdentifier: devices.deviceId
      }).from(pets).leftJoin(devices, eq(pets.deviceId, devices.id)).where(eq(pets.userId, appUserId));
      res.json(result);
    } catch (err) {
      console.error("Error fetching pets:", err);
      res.status(500).json({ error: "Failed to fetch pets" });
    }
  });
  app2.post("/api/pets", async (req, res) => {
    const appUserId = req.appUserId;
    const { name, species, breed, birthDate, deviceId } = req.body;
    if (!name || !species) {
      return res.status(400).json({ error: "Name and species are required" });
    }
    try {
      const [newPet] = await db.insert(pets).values({
        userId: appUserId,
        name,
        species,
        breed,
        birthDate: birthDate || null,
        deviceId: deviceId || null
      }).returning();
      res.status(201).json(newPet);
    } catch (error) {
      console.error("Error creating pet:", error);
      res.status(500).json({ error: "Failed to create pet" });
    }
  });
  app2.patch("/api/pets/:petId", async (req, res) => {
    const appUserId = req.appUserId;
    const petId = req.params.petId;
    try {
      const { deviceId } = LinkDeviceToPetSchema.parse(req.body);
      const existingPet = await db.query.pets.findFirst({
        where: and(eq(pets.id, petId), eq(pets.userId, appUserId))
      });
      if (!existingPet) {
        return res.status(404).json({ error: "Pet not found or not owned by user" });
      }
      let deviceToLink = null;
      if (deviceId) {
        deviceToLink = await db.query.devices.findFirst({
          where: and(eq(devices.id, deviceId), eq(devices.userId, appUserId))
        });
        if (!deviceToLink) {
          return res.status(404).json({ error: "Device not found or not owned by user" });
        }
      }
      const [updatedPet] = await db.update(pets).set({ deviceId: deviceId || null }).where(eq(pets.id, petId)).returning();
      res.status(200).json(updatedPet);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      console.error("Error linking device to pet:", error);
      res.status(500).json({ error: "Failed to link device to pet" });
    }
  });
  app2.get("/api/telemetry", async (req, res) => {
    const appUserId = req.appUserId;
    const { petId, start_date, end_date, limit } = req.query;
    const parsedStart = dateSchema.parse(start_date);
    const parsedEnd = dateSchema.parse(end_date);
    const parsedLimit = limitSchema.parse(limit);
    try {
      let targetDeviceIds = [];
      if (petId) {
        const pet = await db.query.pets.findFirst({
          where: and(eq(pets.id, petId), eq(pets.userId, appUserId))
        });
        if (!pet) {
          return res.status(404).json({ error: "Pet not found or not owned by user" });
        }
        if (pet.deviceId) {
          targetDeviceIds.push(pet.deviceId);
        } else {
          return res.status(200).json([]);
        }
      } else {
        const userDevices = await db.query.devices.findMany({
          where: eq(devices.userId, appUserId),
          columns: {
            deviceId: true
          }
        });
        targetDeviceIds = userDevices.map((d) => d.deviceId);
      }
      if (targetDeviceIds.length === 0) {
        return res.status(200).json([]);
      }
      const readings = await db.query.sensorReadings.findMany({
        where: and(
          sql2`${sensorReadings.deviceId} IN ${targetDeviceIds}`,
          parsedStart ? sql2`${sensorReadings.ts} >= ${new Date(parsedStart)}` : void 0,
          parsedEnd ? sql2`${sensorReadings.ts} <= ${new Date(parsedEnd)}` : void 0
        ),
        orderBy: [desc(sensorReadings.ts)],
        limit: parsedLimit
      });
      res.json(readings);
    } catch (err) {
      console.error("Error fetching telemetry:", err);
      res.status(500).json({ error: "Failed to fetch telemetry" });
    }
  });
  app2.post("/api/devices", async (req, res) => {
    const appUserId = req.appUserId;
    try {
      const parsedDevice = NewDeviceSchema.parse(req.body);
      const [newDevice] = await db.insert(devices).values({
        userId: appUserId,
        name: parsedDevice.name,
        deviceType: parsedDevice.deviceType,
        mqttTopic: parsedDevice.mqttTopic,
        // default status to 'offline' or similar initial state
        status: "offline"
        // Assuming a default status for new devices
      }).returning();
      res.status(201).json(newDevice);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      console.error("Error creating device:", error);
      res.status(500).json({ error: "Failed to create device" });
    }
  });
  app2.post("/api/telemetry", async (req, res) => {
    try {
      const parsedTelemetry = NewTelemetrySchema.parse(req.body);
      const existingDevice = await db.query.devices.findFirst({
        where: eq(devices.deviceId, parsedTelemetry.deviceId)
      });
      if (!existingDevice) {
        return res.status(404).json({ error: "Device not found" });
      }
      const [newReading] = await db.insert(sensorReadings).values({
        deviceId: parsedTelemetry.deviceId,
        ts: parsedTelemetry.ts || /* @__PURE__ */ new Date(),
        value: parsedTelemetry.value,
        sensorType: parsedTelemetry.sensorType
      }).returning();
      res.status(201).json(newReading);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      console.error("Error inserting telemetry:", error);
      res.status(500).json({ error: "Failed to insert telemetry" });
    }
  });
  async function verifyDeviceOwnership(req, res, next) {
    const appUserId = req.appUserId;
    const deviceIdParam = req.params.deviceId;
    const device = await db.query.devices.findFirst({
      where: and(
        eq(devices.deviceId, deviceIdParam),
        eq(devices.userId, appUserId)
      )
    });
    if (!device) {
      return res.status(404).json({ message: "Device not found or not owned by user" });
    }
    req.deviceRecord = device;
    next();
  }
  app2.get(
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
            parsedStart ? sql2`${sensorReadings.ts} >= ${new Date(parsedStart)}` : void 0,
            parsedEnd ? sql2`${sensorReadings.ts} <= ${new Date(parsedEnd)}` : void 0
          ),
          orderBy: [desc(sensorReadings.ts)]
        });
        res.json(readings);
      } catch (err) {
        console.error("Error fetching sensor readings:", err);
        res.status(500).json({ error: "Failed to fetch sensor readings" });
      }
    }
  );
  app2.get(
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
            parsedStart ? sql2`${deviceEvents.ts} >= ${new Date(parsedStart)}` : void 0,
            parsedEnd ? sql2`${deviceEvents.ts} <= ${new Date(parsedEnd)}` : void 0
          ),
          orderBy: [desc(deviceEvents.ts)],
          limit: parsedLimit
        });
        res.json(events);
      } catch (err) {
        console.error("Error fetching device events:", err);
        res.status(500).json({ error: "Failed to fetch device events" });
      }
    }
  );
}

// server/websocket.ts
import { WebSocketServer, WebSocket } from "ws";
var wss = null;
var clients = /* @__PURE__ */ new Set();
function initializeWebSocketServer(server) {
  wss = new WebSocketServer({ server });
  wss.on("connection", (ws) => {
    ws.isAlive = true;
    clients.add(ws);
    console.log("Cliente WebSocket conectado. Total clientes:", clients.size);
    ws.on("pong", () => {
      ws.isAlive = true;
    });
    ws.on("message", (message) => {
      console.log("Mensaje recibido v\xEDa WebSocket:", message);
    });
    ws.on("close", () => {
      clients.delete(ws);
      console.log("Cliente WebSocket desconectado. Total clientes:", clients.size);
    });
    ws.on("error", (error) => {
      console.error("Error en WebSocket:", error);
    });
  });
  const interval = setInterval(() => {
    if (wss) {
      clients.forEach((ws) => {
        if (ws.readyState === WebSocket.OPEN) {
          if (!ws.isAlive) {
            console.warn("Cliente WebSocket inactivo, terminando conexi\xF3n.");
            return ws.terminate();
          }
          ws.isAlive = false;
          ws.ping();
        } else if (ws.readyState === WebSocket.CLOSED) {
          clients.delete(ws);
        }
      });
    }
  }, 3e4);
  wss.on("close", () => {
    clearInterval(interval);
  });
  console.log("Servidor WebSocket inicializado.");
}

// server/index.ts
import * as http from "http";
var app = express();
app.use(express.json({
  verify: (req, _res, buf) => {
    req.rawBody = buf;
  }
}));
app.use(express.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
    }
  });
  next();
});
async function startServer() {
  await registerRoutes(app);
  const PORT = process.env.PORT || 3e3;
  const httpServer = http.createServer(app);
  httpServer.listen(PORT, () => {
    console.log(`Servidor Express escuchando en el puerto ${PORT}`);
    initializeWebSocketServer(httpServer);
  });
}
startServer().catch((error) => {
  console.error("Error al iniciar el servidor Express:", error);
});
app.use((err, _req, res, _next) => {
  const status = err.status || err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(status).json({ message });
});
var index_default = app;
export {
  index_default as default
};
