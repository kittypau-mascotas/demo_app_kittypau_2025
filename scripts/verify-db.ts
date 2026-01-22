import "dotenv/config";
import { db } from "../lib/db";
import { sql } from "drizzle-orm";

async function main() {
  console.log("🔍 Diagnóstico de base de datos (Modo Seguro)...");

  try {
    // 1. Prueba de conectividad básica
    const res = await db.execute(sql`SELECT NOW()`);
    const row = Array.isArray(res) ? res[0] : (res as any).rows?.[0];
    console.log("✅ Conexión a Neon establecida:", row?.now || "OK");

    // 2. Ver columnas reales
    const columnsRes = await db.execute(sql`
        SELECT column_name, data_type 
        FROM information_schema.columns 
        WHERE table_name = 'users' AND table_schema = 'public'
    `);
    const columns = Array.isArray(columnsRes) ? columnsRes : (columnsRes as any).rows;
    
    console.log("📊 Estructura actual de la tabla 'users' en Neon:");
    console.table(columns.map((c: any) => ({ name: c.column_name, type: c.data_type })));

    // 2.5 Verificar tabla devices
    const deviceColsRes = await db.execute(sql`
        SELECT column_name FROM information_schema.columns 
        WHERE table_name = 'devices' AND table_schema = 'public'
    `);
    const deviceCols = Array.isArray(deviceColsRes) ? deviceColsRes : (deviceColsRes as any).rows;
    const hasDeviceId = deviceCols.some((c: any) => c.column_name === 'device_id');

    // 3. Ver datos crudos (Raw SQL para evitar errores de Drizzle por desincronización)
    console.log("\n📦 Muestra de datos existentes (Raw SQL):");
    try {
        const usersRes = await db.execute(sql`SELECT * FROM users LIMIT 5`);
        const users = Array.isArray(usersRes) ? usersRes : (usersRes as any).rows;
        console.log("   👤 Usuarios:");
        if (users.length === 0) {
            console.log("      (Vacío)");
        } else {
            console.table(users);
        }

        const devicesRes = await db.execute(sql`SELECT * FROM devices LIMIT 5`);
        const devices = Array.isArray(devicesRes) ? devicesRes : (devicesRes as any).rows;
        console.log("\n   📱 Dispositivos:");
        if (devices.length === 0) {
            console.log("      (Vacío)");
        } else {
            console.table(devices);
        }
    } catch (e) {
        console.log("   No se pudieron leer los datos: " + e);
    }

    console.log("\n--- DIAGNÓSTICO ---");
    const hasName = columns.some((c: any) => c.column_name === 'name');
    const hasFullName = columns.some((c: any) => c.column_name === 'full_name');
    
    if (hasFullName && !hasName) {
        console.log("❌ DESINCRONIZACIÓN CRÍTICA:");
        console.log("   Tu base de datos tiene el esquema ANTIGUO ('full_name', 'id' integer).");
        console.log("   Tu código espera el esquema NUEVO ('name', 'id' uuid).");
        console.log("\n🛠️  SOLUCIÓN RECOMENDADA:");
        console.log("   Ejecuta el siguiente comando para actualizar la base de datos:");
        console.log("   👉 npm run db:push");
    } else if (hasName) {
        console.log("✅ Tabla 'users': Estructura correcta.");
    }
    
    console.log(hasDeviceId ? "✅ Tabla 'devices': Tiene 'device_id'." : "❌ Tabla 'devices': Falta 'device_id' (necesario para IoT).");

    process.exit(0);
  } catch (error: any) {
    console.error("❌ Error inesperado:", error);
    process.exit(1);
  }
}

main();