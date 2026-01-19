import { sql, InferSelectModel, InferInsertModel } from "drizzle-orm";
import { pgTable, serial, text, varchar, timestamp, integer, date, boolean, pgEnum, primaryKey, numeric, jsonb, index } from "drizzle-orm/pg-core";

// --- Enums ---
// Corresponds to: CREATE TYPE device_event_type AS ENUM (...)
export const deviceEventTypeEnum = pgEnum('device_event_type', [
  'online',
  'offline',
  'reboot',
  'error',
  'low_battery',
  'sensor_error'
]);

// --- Tablas ---

// --- Better Auth Tables ---
export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("emailVerified").notNull(),
  image: text("image"),
  createdAt: timestamp("createdAt").notNull(),
  updatedAt: timestamp("updatedAt").notNull()
});

export const session = pgTable("session", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expiresAt").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("createdAt").notNull(),
  updatedAt: timestamp("updatedAt").notNull(),
  ipAddress: text("ipAddress"),
  userAgent: text("userAgent"),
  userId: text("userId").notNull().references(() => user.id)
});

export const account = pgTable("account", {
  id: text("id").primaryKey(),
  accountId: text("accountId").notNull(),
  providerId: text("providerId").notNull(),
  userId: text("userId").notNull().references(() => user.id),
  accessToken: text("accessToken"),
  refreshToken: text("refreshToken"),
  idToken: text("idToken"),
  accessTokenExpiresAt: timestamp("accessTokenExpiresAt"),
  refreshTokenExpiresAt: timestamp("refreshTokenExpiresAt"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("createdAt").notNull(),
  updatedAt: timestamp("updatedAt").notNull()
});

export const verification = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expiresAt").notNull(),
  createdAt: timestamp("createdAt"),
  updatedAt: timestamp("updatedAt")
});

// Tabla de usuarios (users)
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  authUserId: text("auth_user_id").notNull().unique(), // Changed to text to match Better Auth ID
  email: varchar("email", { length: 255 }).unique(),
  fullName: varchar("full_name", { length: 255 }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

// Tabla de dispositivos (devices)
export const devices = pgTable("devices", {
  id: serial("id").primaryKey(),
  deviceId: varchar("device_id", { length: 50 }).notNull().unique(), // Physical device ID from MQTT
  userId: integer("user_id").notNull().references(() => users.id, { onDelete: 'cascade' }),
  name: varchar("name", { length: 100 }).notNull().default('Mi Dispositivo KittyPaw'),
  deviceType: varchar("device_type", { length: 50 }).notNull(),
  mqttTopic: varchar("mqtt_topic", { length: 255 }).notNull(),
  status: varchar("status", { length: 50 }).default('offline'),
  lastSeen: timestamp("last_seen", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
}, (table) => {
  return {
    userIdx: index("devices_user_id_idx").on(table.userId),
  };
});

// Tabla de mascotas (pets)
export const pets = pgTable("pets", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id, { onDelete: 'cascade' }),
  deviceId: integer("device_id").unique().references(() => devices.id, { onDelete: 'set null' }),
  name: varchar("name", { length: 100 }).notNull(),
  species: varchar("species", { length: 50 }),
  breed: varchar("breed", { length: 100 }),
  birthDate: date("birth_date"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
}, (table) => {
  return {
    userIdx: index("pets_user_id_idx").on(table.userId),
  };
});

// Tabla de eventos de dispositivo (device_events)
export const deviceEvents = pgTable("device_events", {
  id: serial("id").primaryKey(),
  deviceId: varchar("device_id", { length: 50 }).notNull(), // From MQTT, not a FK
  eventType: deviceEventTypeEnum("event_type").notNull(),
  payload: jsonb("payload"),
  ts: timestamp("ts", { withTimezone: true }).defaultNow(),
}, (table) => {
  return {
    deviceIdIdx: index("events_device_id_idx").on(table.deviceId),
    timestampIdx: index("events_timestamp_idx").on(table.ts),
  };
});

// Tabla de lecturas de sensores (sensor_readings)
export const sensorReadings = pgTable("sensor_readings", {
  ts: timestamp("ts", { withTimezone: true }).notNull(), // Timestamp from device
  receivedAt: timestamp("received_at", { withTimezone: true }).defaultNow(), // Timestamp from server
  deviceId: varchar("device_id", { length: 50 }).notNull(), // From MQTT, not a FK
  temperatureCelsius: numeric("temperature_celsius", { precision: 5, scale: 2 }),
  humidityPercent: numeric("humidity_percent", { precision: 5, scale: 2 }),
  lightLux: integer("light_lux"),
  weightGrams: numeric("weight_grams", { precision: 8, scale: 2 }),
}, (table) => {
  return {
    pk: primaryKey({ columns: [table.deviceId, table.ts] }),
  };
});

// Exportar tipos inferidos de Drizzle
export type User = InferSelectModel<typeof users>;
export type InsertUser = InferInsertModel<typeof users>;

export type Device = InferSelectModel<typeof devices>;
export type InsertDevice = InferInsertModel<typeof devices>;

export type Pet = InferSelectModel<typeof pets>;
export type InsertPet = InferInsertModel<typeof pets>;

export type SensorReading = InferSelectModel<typeof sensorReadings>;
export type InsertSensorReading = InferInsertModel<typeof sensorReadings>;

export type DeviceEvent = InferSelectModel<typeof deviceEvents>;
export type InsertDeviceEvent = InferInsertModel<typeof deviceEvents>;
