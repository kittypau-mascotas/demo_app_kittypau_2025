import { sql } from "drizzle-orm";
import { pgTable, serial, text, varchar, timestamp, integer, date, real, pgEnum, primaryKey } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// --- Enums ---
export const userRoleEnum = pgEnum('user_role', ['owner', 'carer']);
export const deviceModeEnum = pgEnum('device_mode', ['comedero', 'bebedero', 'collar', 'unknown']);

// --- 1. Tablas Principales ---

// Tabla: households (Hogares)
export const households = pgTable("households", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertHouseholdSchema = createInsertSchema(households);
export type InsertHousehold = z.infer<typeof insertHouseholdSchema>;
export type Household = typeof households.$inferSelect;

// Tabla: users (Usuarios)
export const users = pgTable("users", {
  id: text("id").primaryKey(), // Neon Auth user.id (UUID or similar from external auth provider)
  householdId: integer("household_id").notNull().references(() => households.id), // NEW: User belongs to a household
  name: text("name"), // User's display name, optional
  email: text("email").notNull().unique(), // User's email from external auth, must be unique
  role: userRoleEnum("role").default('carer').notNull(), // Application-specific role
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  id: true,
  householdId: true, // NEW
  name: true,
  email: true,
  role: true,
});
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Tabla: pets (Mascotas)
export const pets = pgTable("pets", {
  id: serial("id").primaryKey(),
  householdId: integer("household_id").notNull().references(() => households.id),
  name: text("name").notNull(),
  species: text("species"),
  breed: text("breed"),
  birthDate: date("birth_date"),
  avatarUrl: text("avatar_url"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(), // Añadido defaultNow
});

export const insertPetSchema = createInsertSchema(pets);
export type InsertPet = z.infer<typeof insertPetSchema>;
export type Pet = typeof pets.$inferSelect;

// Tabla: devices (Dispositivos)
export const devices = pgTable("devices", {
  id: serial("id").primaryKey(),
  householdId: integer("household_id").notNull().references(() => households.id),
  deviceId: text("device_id").notNull().unique(), // ID físico del dispositivo
  name: text("name").notNull(),
  type: text("type").default('unknown').notNull(),
  mode: deviceModeEnum("mode").default('unknown').notNull(),
  status: text("status").default('offline').notNull(),
  batteryLevel: integer("battery_level"),
  lastUpdate: timestamp("last_update"),
  ipAddress: text("ip_address"),
});

export const insertDeviceSchema = createInsertSchema(devices);
export type InsertDevice = z.infer<typeof insertDeviceSchema>;
export type Device = typeof devices.$inferSelect;

// --- 2. Tablas de Eventos y Registros ---

// Tabla: consumptionEvents (Eventos de Consumo)
export const consumptionEvents = pgTable("consumption_events", {
  id: serial("id").primaryKey(),
  deviceId: integer("device_id").notNull().references(() => devices.id),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
  amountGrams: real("amount_grams").notNull(),
  durationSeconds: integer("duration_seconds").notNull(),
});

export const insertConsumptionEventSchema = createInsertSchema(consumptionEvents);
export type InsertConsumptionEvent = z.infer<typeof insertConsumptionEventSchema>;
export type ConsumptionEvent = typeof consumptionEvents.$inferSelect;

// Tabla: sensorReadings (Lecturas de Sensores)
export const sensorReadings = pgTable("sensor_readings", {
  id: serial("id").primaryKey(),
  deviceId: integer("device_id").notNull().references(() => devices.id),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
  type: text("type").notNull(), // 'temperature', 'humidity', 'weight'
  value: real("value").notNull(),
  unit: text("unit"), // '°C', '%', 'g'
});

export const insertSensorReadingSchema = createInsertSchema(sensorReadings);
export type InsertSensorReading = z.infer<typeof insertSensorReadingSchema>;
export type SensorReading = typeof sensorReadings.$inferSelect;

// Tabla: deviceHealthReports (Reportes de Salud del Dispositivo)
export const deviceHealthReports = pgTable("device_health_reports", {
  id: serial("id").primaryKey(),
  deviceId: integer("device_id").notNull().references(() => devices.id),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
  firmwareVersion: text("firmware_version"),
  report: text("report").notNull(), // JSON string del reporte completo
  overallStatus: text("overall_status").notNull(), // 'PASS' o 'FAIL'
});

export const insertDeviceHealthReportSchema = createInsertSchema(deviceHealthReports);
export type InsertDeviceHealthReport = z.infer<typeof insertDeviceHealthReportSchema>;
export type DeviceHealthReport = typeof deviceHealthReports.$inferSelect;

// --- 3. Tablas de Unión (Relaciones) ---

// Tabla: pets_to_devices (Relación Mascotas y Dispositivos)
export const petsToDevices = pgTable("pets_to_devices", {
  petId: integer("pet_id").notNull().references(() => pets.id),
  deviceId: integer("device_id").notNull().references(() => devices.id),
}, (table) => {
  return {
    pk: primaryKey({ columns: [table.petId, table.deviceId] }),
  };
});

export const insertPetToDeviceSchema = createInsertSchema(petsToDevices);
export type InsertPetToDevice = z.infer<typeof insertPetToDeviceSchema>;
export type PetToDevice = typeof petsToDevices.$inferSelect;