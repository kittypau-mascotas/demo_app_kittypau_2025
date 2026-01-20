import { db } from "../lib/db";
import { user, users } from "../lib/schema";
import { eq } from "drizzle-orm";

async function main() {
  console.log("🔄 Iniciando sincronización de usuarios...");

  try {
    // 1. Obtener todos los usuarios de Better-Auth (fuente de verdad para autenticación)
    const authUsers = await db.select().from(user);
    console.log(`📂 Usuarios en Better-Auth: ${authUsers.length}`);

    // 2. Obtener todos los usuarios de la aplicación
    const appUsers = await db.select().from(users);
    const existingAuthIds = new Set(appUsers.map((u) => u.authUserId));

    // 3. Identificar usuarios faltantes
    const missingUsers = authUsers.filter((u) => !existingAuthIds.has(u.id));
    console.log(`⚠️ Usuarios faltantes en tabla 'users': ${missingUsers.length}`);

    if (missingUsers.length === 0) {
      console.log("✅ Todos los usuarios están sincronizados.");
      process.exit(0);
    }

    // 4. Insertar usuarios faltantes
    let successCount = 0;
    let errorCount = 0;

    console.log("🚀 Insertando usuarios faltantes...");

    for (const u of missingUsers) {
      try {
        await db.insert(users).values({
          authUserId: u.id,
          email: u.email,
          fullName: u.name,
        });
        successCount++;
        console.log(`  + Sincronizado: ${u.email}`);
      } catch (error) {
        console.error(`  ❌ Error sincronizando ${u.email}:`, error);
        errorCount++;
      }
    }

    console.log(`\n🏁 Sincronización completada.`);
    console.log(`   Exitosos: ${successCount}`);
    console.log(`   Errores: ${errorCount}`);
    process.exit(0);
  } catch (error) {
    console.error("Fatal error during sync:", error);
    process.exit(1);
  }
}

main();