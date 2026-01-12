import { sql } from "drizzle-orm";
import { pgTable, serial, text, varchar, timestamp, integer, date, real, pgEnum, primaryKey, numeric, jsonb, uuid, index } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

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

// Tabla de usuarios (users)
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  authUserId: uuid("auth_user_id").notNull().unique(), // From Neon Auth
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

// Tabla de planes (plans)
export const plans = pgTable("plans", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 50 }).notNull().unique(),
  price: varchar("price", { length: 20 }).notNull(),
  period: varchar("period", { length: 20 }).notNull(),
  description: text("description"),
  features: jsonb("features").$type<string[]>(),
});

// --- Zod Schemas for API Validation ---
export const insertPetSchema = createInsertSchema(pets).omit({
  id: true,
  userId: true,
  createdAt: true,
});
export type InsertPet = z.infer<typeof insertPetSchema>;

export const selectPetSchema = createSelectSchema(pets);
export type SelectPet = z.infer<typeof selectPetSchema>;

// Schema for the request body when creating a new pet
export const NewPetSchema = z.object({
  name: z.string().min(1, "El nombre de la mascota es requerido"),
  species: z.string().min(1, "La especie de la mascota es requerida"),
  breed: z.string().optional(),
  birthDate: z.string().optional(), // ISO 8601 string
  deviceId: z.number().optional(),
});
