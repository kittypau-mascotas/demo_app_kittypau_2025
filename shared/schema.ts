import { pgTable, serial, text, timestamp, integer, date, boolean, pgEnum, uuid, real, primaryKey } from "drizzle-orm/pg-core";
import { InferSelectModel, InferInsertModel } from "drizzle-orm";

// --- Enums ---
export const deviceModeEnum = pgEnum('device_mode', ['comedero', 'bebedero', 'collar', 'unknown']);
export const userRoleEnum = pgEnum('user_role', ['owner', 'carer']);

// --- Tablas ---

// Tabla de usuarios (users)
export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  name: text("name"),
  avatarUrl: text("avatar_url"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Tabla de mascotas (pets)
export const pets = pgTable("pets", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id").notNull().references(() => users.id, { onDelete: 'cascade' }),
  name: text("name").notNull(),
  species: text("species").notNull(),
  breed: text("breed"),
  birthDate: date("birth_date"),
  weight: real("weight"),
  photoUrl: text("photo_url"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Tabla de dispositivos (devices)
export const devices = pgTable("devices", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id").notNull().references(() => users.id, { onDelete: 'cascade' }),
  deviceId: text("device_id").notNull().unique(), // The physical device ID like 'KPCL0033'
  petId: uuid("pet_id").references(() => pets.id, { onDelete: 'set null' }),
  name: text("name").notNull(),
  type: text("type").notNull(),
  status: text("status").default('offline'),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Tabla de lecturas de sensores (sensor_readings) - Alineado con docs/ARQUITECTURA_GENERAL.md
export const sensorReadings = pgTable("sensor_readings", {
  id: serial("id").primaryKey(),
  deviceId: text("device_id").notNull(),
  ts: timestamp("ts", { withTimezone: true }).defaultNow().notNull(),
  temperature: real("temperature"),
  humidity: real("humidity"),
  weightGrams: real("weight_grams"),
  batteryLevel: integer("battery_level"),
  ldr: integer("ldr"), // Mantenemos ldr por compatibilidad con tu hardware
});

// Tabla de estado del dispositivo (device_status)
export const deviceStatus = pgTable("device_status", {
  id: serial("id").primaryKey(),
  deviceId: text("device_id").notNull(),
  state: text("state"),
  firmware: text("firmware"),
  uptime: integer("uptime"),
  createdAt: timestamp("created_at").defaultNow(),
  wifiStatus: text("wifi_status"),
  sensorHealth: text("sensor_health"),
});

// Tabla de configuración de usuario (user_settings)
export const userSettings = pgTable("user_settings", {
  userId: uuid("user_id").primaryKey().references(() => users.id, { onDelete: 'cascade' }),
  activePetId: uuid("active_pet_id"),
  theme: text("theme").default('light'),
  createdAt: timestamp("created_at").defaultNow(),
});

// Tabla de eventos de dispositivo (device_events) - Necesaria para api/index.ts
export const deviceEvents = pgTable("device_events", {
  id: serial("id").primaryKey(),
  deviceId: text("device_id").notNull(),
  eventType: text("event_type").notNull(),
  payload: text("payload"), // JSON stringified
  ts: timestamp("ts", { withTimezone: true }).defaultNow(),
});

// Tabla de configuración de alertas - Necesaria para api/index.ts
export const alertSettings = pgTable("alert_settings", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull(), // Se mantiene como text por compatibilidad con auth
  temperatureMax: real("temperature_max"),
  temperatureMin: real("temperature_min"),
  notificationsEnabled: boolean("notifications_enabled").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Exportar tipos inferidos de Drizzle
export type User = InferSelectModel<typeof users>;
export type InsertUser = InferInsertModel<typeof users>;

export type Pet = InferSelectModel<typeof pets>;
export type InsertPet = InferInsertModel<typeof pets>;

export type Device = InferSelectModel<typeof devices>;
export type InsertDevice = InferInsertModel<typeof devices>;

export type SensorReading = InferSelectModel<typeof sensorReadings>;
export type InsertSensorReading = InferInsertModel<typeof sensorReadings>;

export type DeviceStatus = InferSelectModel<typeof deviceStatus>;
export type InsertDeviceStatus = InferInsertModel<typeof deviceStatus>;

export type UserSettings = InferSelectModel<typeof userSettings>;
export type InsertUserSettings = InferInsertModel<typeof userSettings>;

// Alias para compatibilidad si es necesario en otras partes del código
export const telemetry = sensorReadings;
