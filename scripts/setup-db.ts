import "dotenv/config";
import { db } from "../lib/db";
import { sql } from "drizzle-orm";

async function main() {
  console.log("🛠️  Configurando esquema de base de datos en Neon...");

  try {
6
    
    // Tablas antiguas de NEON.md que no usamos
    await db.execute(sql`DROP TABLE IF EXISTS households CASCADE`);
    await db.execute(sql`DROP TABLE IF EXISTS consumption_events CASCADE`);
    await db.execute(sql`DROP TABLE IF EXISTS device_health CASCADE`);
    await db.execute(sql`DROP TABLE IF EXISTS device_health_reports CASCADE`);

    // 2. Crear Tablas Nuevas según shared/schema.ts
    console.log("   Creando tablas nuevas...");

    // Extensions
    await db.execute(sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);

    // Enums
    await db.execute(sql`DO $$ BEGIN CREATE TYPE "device_mode" AS ENUM('comedero', 'bebedero', 'collar', 'unknown'); EXCEPTION WHEN duplicate_object THEN null; END $$;`);
    await db.execute(sql`DO $$ BEGIN CREATE TYPE "user_role" AS ENUM('owner', 'carer'); EXCEPTION WHEN duplicate_object THEN null; END $$;`);

    // Users
    await db.execute(sql`
      CREATE TABLE "users" (
        "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        "email" text NOT NULL UNIQUE,
        "password" text NOT NULL,
        "name" text,
        "avatar_url" text,
        "created_at" timestamp DEFAULT now() NOT NULL,
        "updated_at" timestamp DEFAULT now()
      );
    `);

    // Pets
    await db.execute(sql`
      CREATE TABLE "pets" (
        "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        "user_id" uuid NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
        "name" text NOT NULL,
        "species" text NOT NULL,
        "breed" text,
        "birth_date" date,
        "weight" real,
        "photo_url" text,
        "created_at" timestamp DEFAULT now() NOT NULL
      );
    `);

    // Devices
    await db.execute(sql`
      CREATE TABLE "devices" (
        "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        "user_id" uuid NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
        "device_id" text NOT NULL UNIQUE,
        "pet_id" uuid REFERENCES "pets"("id") ON DELETE SET NULL,
        "name" text NOT NULL,
        "type" text NOT NULL,
        "status" text DEFAULT 'offline',
        "created_at" timestamp DEFAULT now() NOT NULL
      );
    `);

    // Sensor Readings (Telemetry)
    await db.execute(sql`
      CREATE TABLE "sensor_readings" (
        "id" serial PRIMARY KEY,
        "device_id" text NOT NULL,
        "ts" timestamp with time zone DEFAULT now() NOT NULL,
        "temperature" real,
        "humidity" real,
        "weight_grams" real,
        "battery_level" integer,
        "ldr" integer
      );
    `);
    await db.execute(sql`CREATE INDEX IF NOT EXISTS idx_sensor_readings_device_ts ON sensor_readings (device_id, ts DESC);`);

    // Device Status
    await db.execute(sql`
      CREATE TABLE "device_status" (
        "id" serial PRIMARY KEY,
        "device_id" text NOT NULL,
        "state" text,
        "firmware" text,
        "uptime" integer,
        "created_at" timestamp DEFAULT now(),
        "wifi_status" text,
        "sensor_health" text
      );
    `);

    // User Settings
    await db.execute(sql`
      CREATE TABLE "user_settings" (
        "user_id" uuid PRIMARY KEY REFERENCES "users"("id") ON DELETE CASCADE,
        "active_pet_id" uuid,
        "theme" text DEFAULT 'light',
        "created_at" timestamp DEFAULT now()
      );
    `);

    // Device Events
    await db.execute(sql`
      CREATE TABLE "device_events" (
        "id" serial PRIMARY KEY,
        "device_id" text NOT NULL,
        "event_type" text NOT NULL,
        "payload" text,
        "ts" timestamp with time zone DEFAULT now()
      );
    `);

    // Alert Settings
    await db.execute(sql`
      CREATE TABLE "alert_settings" (
        "id" serial PRIMARY KEY,
        "user_id" text NOT NULL,
        "temperature_max" real,
        "temperature_min" real,
        "notifications_enabled" boolean DEFAULT true,
        "created_at" timestamp DEFAULT now(),
        "updated_at" timestamp DEFAULT now()
      );
    `);

    console.log("✅ Base de datos Neon sincronizada con shared/schema.ts");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error al configurar la base de datos:", error);
    process.exit(1);
  }
}

main();