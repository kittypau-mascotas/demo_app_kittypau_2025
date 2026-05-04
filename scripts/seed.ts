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

    // 5. Restaurar Telemetría para KPCL0033 (Datos de los últimos 2 días)
    console.log("📊 Restaurando telemetría histórica para KPCL0033...");
    const telemetryData = [];
    const now = new Date();
    // Generar un punto de datos cada hora durante las últimas 48 horas
    for (let i = 0; i < 48; i++) {
      const date = new Date(now.getTime() - i * 60 * 60 * 1000);
      // Simular variaciones naturales
      const temp = 22 + Math.random() * 5; // 22-27°C
      const hum = 40 + Math.random() * 20; // 40-60%
      const weight = 500 - (i % 12) * 10; // El peso baja al comer y sube al rellenar
      const ldr = i % 24 > 12 ? 0 : 100; // Luz: día/noche

      telemetryData.push({
        deviceId: 'KPCL0033',
        temperature: temp,
        humidity: hum,
        weightGrams: weight,
        ldr: ldr,
        ts: date,
        batteryLevel: 100
      });
    }
    await db.insert(sensorReadings).values(telemetryData);

    console.log("✅ ¡Estructura base creada! Usuarios Admin/Test y Dispositivo KPCL0033 listos.");
    console.log("👉 Ahora puedes importar tu backup de telemetría en la tabla 'sensor_readings'.");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error al poblar la base de datos:", error);
    process.exit(1);
  }
}

main();