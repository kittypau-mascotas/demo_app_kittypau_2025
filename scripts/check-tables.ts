import { db } from "../lib/db";
import { sql } from "drizzle-orm";

async function main() {
  console.log("🔍 Verificando tablas en la base de datos...");

  try {
    const query = sql`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `;
    
    const result = await db.execute(query);
    const tables = result.rows.map((row: any) => row.table_name);

    const requiredTables = [
      "user", "session", "account", "verification", // Auth
      "users", "devices", "pets", "sensor_readings" // App
    ];

    console.log("Tablas encontradas:", tables);

    const missing = requiredTables.filter(t => !tables.includes(t));
    
    if (missing.length > 0) {
      console.error("❌ Faltan las siguientes tablas:", missing);
    } else {
      console.log("✅ Todas las tablas críticas existen.");
    }
    process.exit(0);
  } catch (error) {
    console.error("❌ Error al verificar tablas:", error);
    process.exit(1);
  }
}

main();