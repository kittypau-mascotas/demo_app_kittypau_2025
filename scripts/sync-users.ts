import { db } from "../lib/db";
import { user, users } from "../shared/schema";
import { eq } from "drizzle-orm";

async function main() {
  console.log("🔄 Iniciando sincronización de usuarios...");

  try {
    const authUsers = await db.select().from(user);
    const appUsers = await db.select().from(users);
    const existingAuthIds = new Set(appUsers.map(u => u.authUserId));
    const missingUsers = authUsers.filter(u => !existingAuthIds.has(u.id));

    for (const u of missingUsers as { id: string; email: string; name: string }[]) {
      await db.insert(users).values({
        authUserId: u.id,
        email: u.email,
        fullName: u.name,
      });
      console.log(`  + Sincronizado: ${u.email}`);
    }

    console.log("✅ Sincronización completada.");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error:", error);
    process.exit(1);
  }
}

main();
