var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// server/index.ts
import express from "express";

// shared/schema.ts
var schema_exports = {};
__export(schema_exports, {
  consumptionEvents: () => consumptionEvents2,
  deviceHealthReports: () => deviceHealthReports2,
  deviceModeEnum: () => deviceModeEnum,
  devices: () => devices,
  households: () => households,
  insertConsumptionEventSchema: () => insertConsumptionEventSchema2,
  insertDeviceHealthReportSchema: () => insertDeviceHealthReportSchema2,
  insertDeviceSchema: () => insertDeviceSchema,
  insertHouseholdSchema: () => insertHouseholdSchema,
  insertPetSchema: () => insertPetSchema,
  insertPetToDeviceSchema: () => insertPetToDeviceSchema,
  insertSensorReadingSchema: () => insertSensorReadingSchema2,
  insertUserSchema: () => insertUserSchema,
  pets: () => pets,
  petsToDevices: () => petsToDevices2,
  sensorReadings: () => sensorReadings2,
  userRoleEnum: () => userRoleEnum,
  users: () => users
});
import { pgTable, serial, text, timestamp, integer, date, real, pgEnum, primaryKey } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
var userRoleEnum = pgEnum("user_role", ["owner", "carer"]);
var deviceModeEnum = pgEnum("device_mode", ["comedero", "bebedero", "collar", "unknown"]);
var households = pgTable("households", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull()
});
var insertHouseholdSchema = createInsertSchema(households);
var users = pgTable("users", {
  id: text("id").primaryKey(),
  // Neon Auth user.id (UUID or similar from external auth provider)
  householdId: integer("household_id").notNull().references(() => households.id),
  // NEW: User belongs to a household
  name: text("name"),
  // User's display name, optional
  email: text("email").notNull().unique(),
  // User's email from external auth, must be unique
  role: userRoleEnum("role").default("carer").notNull(),
  // Application-specific role
  createdAt: timestamp("created_at").defaultNow().notNull()
});
var insertUserSchema = createInsertSchema(users).pick({
  id: true,
  householdId: true,
  // NEW
  name: true,
  email: true,
  role: true
});
var pets = pgTable("pets", {
  id: serial("id").primaryKey(),
  householdId: integer("household_id").notNull().references(() => households.id),
  name: text("name").notNull(),
  species: text("species"),
  breed: text("breed"),
  birthDate: date("birth_date"),
  avatarUrl: text("avatar_url"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
  // Añadido defaultNow
});
var insertPetSchema = createInsertSchema(pets);
var devices = pgTable("devices", {
  id: serial("id").primaryKey(),
  householdId: integer("household_id").notNull().references(() => households.id),
  deviceId: text("device_id").notNull().unique(),
  // ID físico del dispositivo
  name: text("name").notNull(),
  type: text("type").default("unknown").notNull(),
  mode: deviceModeEnum("mode").default("unknown").notNull(),
  status: text("status").default("offline").notNull(),
  batteryLevel: integer("battery_level"),
  lastUpdate: timestamp("last_update"),
  ipAddress: text("ip_address")
});
var insertDeviceSchema = createInsertSchema(devices);
var consumptionEvents2 = pgTable("consumption_events", {
  id: serial("id").primaryKey(),
  deviceId: integer("device_id").notNull().references(() => devices.id),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
  amountGrams: real("amount_grams").notNull(),
  durationSeconds: integer("duration_seconds").notNull()
});
var insertConsumptionEventSchema2 = createInsertSchema(consumptionEvents2);
var sensorReadings2 = pgTable("sensor_readings", {
  id: serial("id").primaryKey(),
  deviceId: integer("device_id").notNull().references(() => devices.id),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
  type: text("type").notNull(),
  // 'temperature', 'humidity', 'weight'
  value: real("value").notNull(),
  unit: text("unit")
  // '°C', '%', 'g'
});
var insertSensorReadingSchema2 = createInsertSchema(sensorReadings2);
var deviceHealthReports2 = pgTable("device_health_reports", {
  id: serial("id").primaryKey(),
  deviceId: integer("device_id").notNull().references(() => devices.id),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
  firmwareVersion: text("firmware_version"),
  report: text("report").notNull(),
  // JSON string del reporte completo
  overallStatus: text("overall_status").notNull()
  // 'PASS' o 'FAIL'
});
var insertDeviceHealthReportSchema2 = createInsertSchema(deviceHealthReports2);
var petsToDevices2 = pgTable("pets_to_devices", {
  petId: integer("pet_id").notNull().references(() => pets.id),
  deviceId: integer("device_id").notNull().references(() => devices.id)
}, (table) => {
  return {
    pk: primaryKey({ columns: [table.petId, table.deviceId] })
  };
});
var insertPetToDeviceSchema = createInsertSchema(petsToDevices2);

// server/db.ts
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
if (process.env.NODE_ENV !== "production") {
}
var databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  throw new Error("DATABASE_URL is not set");
}
var sql = neon(databaseUrl);
var db = drizzle(sql, { schema: schema_exports });

// server/storage.ts
import { eq } from "drizzle-orm";
var DrizzleStorage = class {
  // --- Usuarios ---
  async getUser(id) {
    const result = await db.select().from(users).where(eq(users.id, id)).limit(1);
    return result[0];
  }
  async createUser(insertUser) {
    try {
      const result = await db.insert(users).values(insertUser).returning();
      return result[0];
    } catch (error) {
      console.error("Error al crear usuario en la DB:", error);
      return void 0;
    }
  }
  // --- Households ---
  async createHousehold(insertHousehold) {
    try {
      insertHouseholdSchema.parse(insertHousehold);
      const result = await db.insert(households).values(insertHousehold).returning();
      return result[0];
    } catch (error) {
      console.error("Error al crear hogar en la DB:", error);
      return void 0;
    }
  }
  async getHousehold(id) {
    const result = await db.select().from(households).where(eq(households.id, id)).limit(1);
    return result[0];
  }
  async getHouseholds() {
    return db.select().from(households);
  }
  // --- Pets ---
  async createPet(insertPet) {
    try {
      insertPetSchema.parse(insertPet);
      const result = await db.insert(pets).values(insertPet).returning();
      return result[0];
    } catch (error) {
      console.error("Error al crear mascota en la DB:", error);
      return void 0;
    }
  }
  async getPet(id) {
    const result = await db.select().from(pets).where(eq(pets.id, id)).limit(1);
    return result[0];
  }
  async getPets(householdId) {
    if (householdId) {
      return db.select().from(pets).where(eq(pets.householdId, householdId));
    }
    return db.select().from(pets);
  }
  // --- Devices ---
  async createDevice(insertDevice) {
    try {
      insertDeviceSchema.parse(insertDevice);
      const result = await db.insert(devices).values(insertDevice).returning();
      return result[0];
    } catch (error) {
      console.error("Error al crear dispositivo en la DB:", error);
      return void 0;
    }
  }
  async getDevice(id) {
    const result = await db.select().from(devices).where(eq(devices.id, id)).limit(1);
    return result[0];
  }
  async getDevices(householdId) {
    if (householdId) {
      return db.select().from(devices).where(eq(devices.householdId, householdId));
    }
    return db.select().from(devices);
  }
  // --- Consumption Events ---
  async createConsumptionEvent(insertEvent) {
    try {
      insertConsumptionEventSchema.parse(insertEvent);
      const result = await db.insert(consumptionEvents).values(insertEvent).returning();
      return result[0];
    } catch (error) {
      console.error("Error al crear evento de consumo en la DB:", error);
      return void 0;
    }
  }
  async getConsumptionEvent(id) {
    const result = await db.select().from(consumptionEvents).where(eq(consumptionEvents.id, id)).limit(1);
    return result[0];
  }
  async getConsumptionEventsByDevice(deviceId) {
    return db.select().from(consumptionEvents).where(eq(consumptionEvents.deviceId, deviceId));
  }
  // --- Sensor Readings ---
  async createSensorReading(insertReading) {
    try {
      insertSensorReadingSchema.parse(insertReading);
      const result = await db.insert(sensorReadings).values(insertReading).returning();
      return result[0];
    } catch (error) {
      console.error("Error al crear lectura de sensor en la DB:", error);
      return void 0;
    }
  }
  async getSensorReading(id) {
    const result = await db.select().from(sensorReadings).where(eq(sensorReadings.id, id)).limit(1);
    return result[0];
  }
  async getSensorReadingsByDevice(deviceId) {
    return db.select().from(sensorReadings).where(eq(sensorReadings.deviceId, deviceId));
  }
  // --- Device Health Reports ---
  async createDeviceHealthReport(insertReport) {
    try {
      insertDeviceHealthReportSchema.parse(insertReport);
      const result = await db.insert(deviceHealthReports).values(insertReport).returning();
      return result[0];
    } catch (error) {
      console.error("Error al crear reporte de salud del dispositivo en la DB:", error);
      return void 0;
    }
  }
  async getDeviceHealthReport(id) {
    const result = await db.select().from(deviceHealthReports).where(eq(deviceHealthReports.id, id)).limit(1);
    return result[0];
  }
  async getDeviceHealthReportsByDevice(deviceId) {
    return db.select().from(deviceHealthReports).where(eq(deviceHealthReports.deviceId, deviceId));
  }
  // --- Pets To Devices ---
  async addPetToDevice(petId, deviceId) {
    try {
      await db.insert(petsToDevices).values({ petId, deviceId });
    } catch (error) {
      console.error("Error al a\xF1adir relaci\xF3n mascota-dispositivo en la DB:", error);
    }
  }
  async removePetFromDevice(petId, deviceId) {
    try {
      await db.delete(petsToDevices).where(
        and(eq(petsToDevices.petId, petId), eq(petsToDevices.deviceId, deviceId))
      );
    } catch (error) {
      console.error("Error al eliminar relaci\xF3n mascota-dispositivo en la DB:", error);
    }
  }
  async getDevicesForPet(petId) {
    const result = await db.select({ device: devices }).from(petsToDevices).innerJoin(devices, eq(petsToDevices.deviceId, devices.id)).where(eq(petsToDevices.petId, petId));
    return result.map((row) => row.device);
  }
  async getPetsForDevice(deviceId) {
    const result = await db.select({ pet: pets }).from(petsToDevices).innerJoin(pets, eq(petsToDevices.petId, pets.id)).where(eq(petsToDevices.deviceId, deviceId));
    return result.map((row) => row.pet);
  }
};
var storage = new DrizzleStorage();

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

// server/routes.ts
import { eq as eq2 } from "drizzle-orm";
async function registerRoutes(app2) {
  app2.get("/api/me", requireNeonAuth, async (req, res) => {
    const neonUser = req.neonUser;
    const existing = await db.select().from(users).where(eq2(users.id, neonUser.id)).limit(1);
    let user = existing[0];
    if (!user) {
      const newHouseholdName = `${neonUser.name || neonUser.email?.split("@")[0]}'s Household`;
      const insertedHousehold = await storage.createHousehold({ name: newHouseholdName });
      if (!insertedHousehold) {
        console.error(`Failed to create default household for user ${neonUser.id}`);
        return res.status(500).json({ error: "Failed to provision user household" });
      }
      const inserted = await db.insert(users).values({
        id: neonUser.id,
        email: neonUser.email,
        name: neonUser.name || neonUser.email?.split("@")[0],
        // Use optional chaining for email
        role: "owner",
        // Default role for a user creating their own household
        householdId: insertedHousehold.id
        // Assign to the new default household
      }).returning();
      user = inserted[0];
    }
    res.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        householdId: user.householdId
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
  app2.post("/api/households", requireNeonAuth, async (req, res) => {
    const newHousehold = await storage.createHousehold(req.body);
    if (newHousehold) {
      res.status(201).json(newHousehold);
    } else {
      res.status(400).json({ message: "Error al crear hogar" });
    }
  });
  app2.get("/api/households/:id", requireNeonAuth, async (req, res) => {
    const household = await storage.getHousehold(parseInt(req.params.id));
    if (household) {
      res.json(household);
    } else {
      res.status(404).json({ message: "Hogar no encontrado" });
    }
  });
  app2.get("/api/households", requireNeonAuth, async (req, res) => {
    const households2 = await storage.getHouseholds();
    res.json(households2);
  });
  app2.post("/api/pets", requireNeonAuth, async (req, res) => {
    const newPet = await storage.createPet(req.body);
    if (newPet) {
      res.status(201).json(newPet);
    } else {
      res.status(400).json({ message: "Error al crear mascota" });
    }
  });
  app2.get("/api/pets/:id", requireNeonAuth, async (req, res) => {
    const pet = await storage.getPet(parseInt(req.params.id));
    if (pet) {
      res.json(pet);
    } else {
      res.status(404).json({ message: "Mascota no encontrada" });
    }
  });
  app2.get("/api/pets", requireNeonAuth, async (req, res) => {
    const householdId = req.query.householdId ? parseInt(req.query.householdId) : void 0;
    const pets2 = await storage.getPets(householdId);
    res.json(pets2);
  });
  app2.post("/api/devices", requireNeonAuth, async (req, res) => {
    const newDevice = await storage.createDevice(req.body);
    if (newDevice) {
      res.status(201).json(newDevice);
    } else {
      res.status(400).json({ message: "Error al crear dispositivo" });
    }
  });
  app2.get("/api/devices/:id", requireNeonAuth, async (req, res) => {
    const device = await storage.getDevice(parseInt(req.params.id));
    if (device) {
      res.json(device);
    } else {
      res.status(404).json({ message: "Dispositivo no encontrado" });
    }
  });
  app2.get("/api/devices", requireNeonAuth, async (req, res) => {
    const householdId = req.query.householdId ? parseInt(req.query.householdId) : void 0;
    const devices2 = await storage.getDevices(householdId);
    res.json(devices2);
  });
  app2.get("/api/sensor-readings", requireNeonAuth, async (req, res) => {
    const deviceId = parseInt(req.query.deviceId);
    if (isNaN(deviceId)) {
      return res.status(400).json({ message: "ID de dispositivo inv\xE1lido" });
    }
    const readings = await storage.getSensorReadingsByDevice(deviceId);
    res.json(readings);
  });
  app2.get("/api/consumption-events", requireNeonAuth, async (req, res) => {
    const deviceId = parseInt(req.query.deviceId);
    if (isNaN(deviceId)) {
      return res.status(400).json({ message: "ID de dispositivo inv\xE1lido" });
    }
    const events = await storage.getConsumptionEventsByDevice(deviceId);
    res.json(events);
  });
}

// server/mqtt.ts
import * as mqtt from "mqtt";
import { eq as eq3 } from "drizzle-orm";

// server/mqtt-schemas.ts
import { z } from "zod";
var healthReportPayloadSchema = z.object({
  deviceId: z.string(),
  timestamp: z.string().datetime(),
  firmwareVersion: z.string().optional(),
  overallStatus: z.enum(["PASS", "FAIL"]),
  // Ajustado para manejar datos arbitrarios dentro de 'results'
  results: z.record(z.string(), z.any()).optional()
});
var sensorReadingPayloadSchema = z.object({
  deviceId: z.string(),
  timestamp: z.string().datetime(),
  sensorType: z.string(),
  // e.g., 'temperature', 'humidity', 'weight', 'motion'
  value: z.number(),
  unit: z.string().optional()
  // e.g., '°C', '%', 'g'
});
var commandPayloadSchema = z.object({
  ssid: z.string(),
  password: z.string()
});

// server/mqtt.ts
import * as fs from "fs";
import * as path from "path";
function initializeMqttClient(broadcast2) {
  const AWS_IOT_ENDPOINT = process.env.AWS_IOT_ENDPOINT;
  const AWS_REGION = process.env.AWS_REGION;
  const MQTT_CLIENT_ID = process.env.MQTT_CLIENT_ID || `kittypau-iot-bridge-${Math.random().toString(16).substr(2, 8)}`;
  if (!AWS_IOT_ENDPOINT || !AWS_REGION) {
    console.error("AWS_IOT_ENDPOINT and AWS_REGION must be set in environment variables.");
    const client2 = mqtt.connect("mqtt://broker.hivemq.com");
    console.warn("Connecting to a public MQTT broker (HiveMQ) due to missing AWS IoT environment variables. THIS IS FOR DEVELOPMENT ONLY!");
    setupMqttEventHandlers(client2, broadcast2);
    return;
  }
  const PRIVATE_KEY_PATH = process.env.AWS_IOT_PRIVATE_KEY_PATH;
  const CERTIFICATE_PATH = process.env.AWS_IOT_CERT_PATH;
  const ROOT_CA_PATH = process.env.AWS_IOT_ROOT_CA_PATH;
  if (!PRIVATE_KEY_PATH || !CERTIFICATE_PATH || !ROOT_CA_PATH) {
    console.error("AWS IoT certificate paths (AWS_IOT_PRIVATE_KEY_PATH, AWS_IOT_CERT_PATH, AWS_IOT_ROOT_CA_PATH) must be set in environment variables.");
    const client2 = mqtt.connect("mqtt://broker.hivemq.com");
    console.warn("Connecting to a public MQTT broker (HiveMQ) due to missing AWS IoT certificate paths. THIS IS FOR DEVELOPMENT ONLY!");
    setupMqttEventHandlers(client2, broadcast2);
    return;
  }
  const clientOptions = {
    host: AWS_IOT_ENDPOINT.split("://")[1] || AWS_IOT_ENDPOINT,
    // Extract hostname
    protocol: "mqtts",
    // AWS IoT Core uses mqtts for mTLS
    clientId: MQTT_CLIENT_ID,
    key: fs.readFileSync(path.resolve(PRIVATE_KEY_PATH)),
    cert: fs.readFileSync(path.resolve(CERTIFICATE_PATH)),
    ca: fs.readFileSync(path.resolve(ROOT_CA_PATH)),
    reconnectPeriod: 5e3,
    // Reconnect every 5 seconds
    qos: 1
    // At least once delivery
  };
  const client = mqtt.connect(clientOptions);
  client.on("connect", () => {
    console.log("Conectado al broker MQTT de AWS IoT Core.");
    client.subscribe("kittypau/+/data/sensors", { qos: 1 }, (err) => {
      if (!err) {
        console.log("Suscrito a kittypau/+/data/sensors");
      } else {
        console.error("Error al suscribirse a kittypau/+/data/sensors:", err);
      }
    });
    client.subscribe("kittypau/+/health", { qos: 1 }, (err) => {
      if (!err) {
        console.log("Suscrito a kittypau/+/health");
      }
    });
    client.subscribe("kittypau/+/cmnd/#", { qos: 1 }, (err) => {
      if (!err) {
        console.log("Suscrito a kittypau/+/cmnd/#");
      } else {
        console.error("Error al suscribirse a kittypau/+/cmnd/#:", err);
      }
    });
  });
  setupMqttEventHandlers(client, broadcast2);
}
function setupMqttEventHandlers(client, broadcast2) {
  client.on("message", (topic, message) => {
    handleMqttMessage(topic, message, broadcast2);
  });
  client.on("error", (err) => {
    console.error("Error en el cliente MQTT:", err);
  });
  client.on("offline", () => {
    console.warn("Cliente MQTT desconectado del broker.");
  });
  client.on("reconnect", () => {
    console.log("Cliente MQTT intentando reconectar...");
  });
}
async function handleMqttMessage(topic, message, broadcast2) {
  try {
    const messageString = message.toString();
    const rawPayload = JSON.parse(messageString);
    const topicParts = topic.split("/");
    const deviceId = topicParts[1];
    if (!deviceId) {
      console.warn(`Mensaje MQTT en t\xF3pico inv\xE1lido (sin deviceId): ${topic}`);
      return;
    }
    const existingDevice = await db.query.devices.findFirst({
      where: eq3(devices.deviceId, deviceId)
    });
    if (!existingDevice) {
      console.warn(`Dispositivo con ID ${deviceId} no encontrado en la DB para t\xF3pico ${topic}. Mensaje ignorado.`);
      return;
    }
    if (topic.includes("/data/sensors")) {
      await handleSensorData(deviceId, rawPayload, existingDevice.id, broadcast2);
    } else if (topic.includes("/health")) {
      await handleDeviceHealth(deviceId, rawPayload, existingDevice.id, broadcast2);
    } else if (topic.includes("/cmnd/")) {
      console.log(`Comando MQTT recibido para ${deviceId} en t\xF3pico ${topic}:`, rawPayload);
    } else {
      console.log(`Mensaje MQTT recibido en t\xF3pico no manejado ${topic}:`, rawPayload);
    }
  } catch (error) {
    console.error("Error procesando mensaje MQTT:", error);
  }
}
async function handleSensorData(deviceIdStr, rawPayload, dbDeviceId, broadcast2) {
  try {
    const payload = sensorReadingPayloadSchema.parse(rawPayload);
    console.log(`Lectura de sensor de ${deviceIdStr} recibida:`, payload);
    await db.insert(sensorReadings2).values({
      deviceId: dbDeviceId,
      timestamp: new Date(payload.timestamp),
      type: payload.sensorType,
      value: payload.value,
      unit: payload.unit
    });
    console.log(`Lectura de sensor para ${deviceIdStr} guardada y emitida.`);
    broadcast2(`sensorData/${deviceIdStr}`, payload);
  } catch (error) {
    console.error(`Error procesando datos de sensor para ${deviceIdStr}:`, error);
  }
}
async function handleDeviceHealth(deviceIdStr, rawPayload, dbDeviceId, broadcast2) {
  try {
    const payload = healthReportPayloadSchema.parse(rawPayload);
    console.log(`Reporte de salud de ${deviceIdStr} recibido:`, payload);
    await db.insert(deviceHealthReports2).values({
      deviceId: dbDeviceId,
      timestamp: new Date(payload.timestamp),
      firmwareVersion: payload.firmwareVersion,
      report: JSON.stringify(rawPayload),
      // Guardar el JSON completo como string
      overallStatus: payload.overallStatus
    });
    console.log(`Reporte de salud para ${deviceIdStr} guardado y emitido.`);
    broadcast2(`deviceHealth/${deviceIdStr}`, payload);
  } catch (error) {
    console.error(`Error procesando reporte de salud para ${deviceIdStr}:`, error);
  }
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
function broadcast(eventType, payload) {
  const message = JSON.stringify({ event: eventType, data: payload });
  clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });
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
  const path2 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path2.startsWith("/api")) {
      let logLine = `${req.method} ${path2} ${res.statusCode} in ${duration}ms`;
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
    initializeMqttClient(broadcast);
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
