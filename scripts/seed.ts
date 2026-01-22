import "dotenv/config";
import { db } from "../lib/db";
import { users, pets, devices, sensorReadings } from "../shared/schema"; // Asegurar importación correcta
import { eq } from "drizzle-orm";

async function main() {
  console.log("🌱 Iniciando siembra de datos (Seeding)...");

  try {
    // 1. Crear Usuario Admin
    console.log("👤 Creando usuario Admin...");
    let [admin] = await db.insert(users).values({
      email: 'admin@kittypau.com',
      password: '$2a$10$X7V.j.X7V.j.X7V.j.X7V.j.X7V.j.X7V.j.X7V.j.X7V.j.X7V.', // Hash de ejemplo
      name: 'Admin User',
    }).onConflictDoNothing().returning();

    // Si ya existía, lo recuperamos
    if (!admin) {
        const res = await db.select().from(users).where(eq(users.email, 'admin@kittypau.com'));
        admin = res[0];
    }

    // 2. Crear Usuario Test
    console.log("👤 Creando usuario Test...");
    await db.insert(users).values({
      email: 'test@kittypau.com',
      password: '$2a$10$X7V.j.X7V.j.X7V.j.X7V.j.X7V.j.X7V.j.X7V.j.X7V.j.X7V.',
      name: 'Test User',
    }).onConflictDoNothing();

    // 3. Crear Mascota 'Bandida' para el Admin
    console.log("🐾 Creando mascota Bandida...");
    const [bandida] = await db.insert(pets).values({
      userId: admin.id,
      name: 'Bandida',
      species: 'Gato',
      breed: 'Mestizo',
      photoUrl: '/graficas/bandida.jpg'
    }).returning();

    // 4. Crear Dispositivo 'KPCL0033' y vincularlo
    console.log("📱 Creando dispositivo KPCL0033...");
    await db.insert(devices).values({
      userId: admin.id,
      deviceId: 'KPCL0033',
      name: 'Comedero Principal',
      type: 'feeder',
      status: 'online',
      petId: bandida.id
    }).onConflictDoNothing();

    console.log("✅ ¡Estructura base creada! Usuarios Admin/Test y Dispositivo KPCL0033 listos.");
    console.log("👉 Ahora puedes importar tu backup de telemetría en la tabla 'sensor_readings'.");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error al poblar la base de datos:", error);
    process.exit(1);
  }
}

main();