import "dotenv/config";
import { db } from "../lib/db";
import { sql } from "drizzle-orm";

async function main() {
  console.log("🧨 Eliminando TODAS las tablas de la base de datos...");

  try {
    // Eliminamos las tablas con CASCADE para borrar también las dependencias
    await db.execute(sql`DROP TABLE IF EXISTS sensor_readings CASCADE`);
    await db.execute(sql`DROP TABLE IF EXISTS telemetry CASCADE`);
    await db.execute(sql`DROP TABLE IF EXISTS device_events CASCADE`);
    await db.execute(sql`DROP TABLE IF EXISTS alert_settings CASCADE`);
    await db.execute(sql`DROP TABLE IF EXISTS device_status CASCADE`);
    await db.execute(sql`DROP TABLE IF EXISTS user_settings CASCADE`);
    await db.execute(sql`DROP TABLE IF EXISTS devices CASCADE`);
    await db.execute(sql`DROP TABLE IF EXISTS pets CASCADE`);
    await db.execute(sql`DROP TABLE IF EXISTS users CASCADE`);
    
    // Limpieza de tablas de auth si existen
    await db.execute(sql`DROP TABLE IF EXISTS session CASCADE`);
    await db.execute(sql`DROP TABLE IF EXISTS account CASCADE`);
    await db.execute(sql`DROP TABLE IF EXISTS verification CASCADE`);

    console.log("✅ Base de datos limpia (0 tablas).");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error:", error);
    process.exit(1);
  }
}

main();