import "dotenv/config";
import { db } from "../lib/db";
import { sensorReadings } from "../shared/schema";
import * as mqtt from "mqtt";
import * as fs from "fs";

// Configuración desde variables de entorno
const IOT_ENDPOINT = process.env.AWS_IOT_ENDPOINT;
const KEY_PATH = process.env.AWS_KEY_PATH || "./certs/private.pem.key";
const CERT_PATH = process.env.AWS_CERT_PATH || "./certs/certificate.pem.crt";
const CA_PATH = process.env.AWS_CA_PATH || "./certs/root-CA.crt";

if (!IOT_ENDPOINT) {
  console.error("❌ AWS_IOT_ENDPOINT no está definido en .env");
  console.error("   Por favor agrégalo (ej: xxxxxxxxxx-ats.iot.us-east-1.amazonaws.com)");
  process.exit(1);
}

async function main() {
  console.log("🌉 Iniciando Bridge MQTT (AWS IoT -> NeonDB)...");

  // Verificar certificados
  if (!fs.existsSync(KEY_PATH) || !fs.existsSync(CERT_PATH) || !fs.existsSync(CA_PATH)) {
    console.warn("⚠️  No se encontraron los certificados en ./certs/");
    console.warn("   Asegúrate de tener: private.pem.key, certificate.pem.crt, root-CA.crt");
    // No salimos para permitir pruebas si alguien modifica el código para usar websockets sin certs
  }

  const client = mqtt.connect(`mqtts://${IOT_ENDPOINT}:8883`, {
    key: fs.existsSync(KEY_PATH) ? fs.readFileSync(KEY_PATH) : undefined,
    cert: fs.existsSync(CERT_PATH) ? fs.readFileSync(CERT_PATH) : undefined,
    ca: fs.existsSync(CA_PATH) ? fs.readFileSync(CA_PATH) : undefined,
    protocol: 'mqtts',
    clientId: 'kittypau-bridge-' + Math.random().toString(16).substr(2, 8),
    reconnectPeriod: 5000,
  });

  client.on("connect", () => {
    console.log("✅ Conectado a AWS IoT Core");
    // Suscribirse a todos los dispositivos KittyPaw
    client.subscribe("kittypau/+/telemetry", (err) => {
      if (err) console.error("❌ Error de suscripción:", err);
      else console.log("📡 Escuchando en: kittypau/+/telemetry");
    });
  });

  client.on("message", async (topic, message) => {
    try {
      const payload = JSON.parse(message.toString());
      const deviceId = topic.split('/')[1]; // Extraer ID del topic: kittypau/KPCL0033/telemetry

      console.log(`📨 Dato recibido de ${deviceId}:`, payload);

      await db.insert(sensorReadings).values({
        deviceId: deviceId,
        temperature: payload.temp || payload.temperature || 0,
        humidity: payload.hum || payload.humidity || 0,
        weightGrams: payload.weight || payload.weight_grams || 0,
        ldr: payload.ldr || 0,
        ts: new Date(),
      });
    } catch (error) {
      console.error("❌ Error procesando mensaje:", error);
    }
  });

  client.on("error", (err) => {
    console.error("❌ Error MQTT:", err);
  });
}

main();