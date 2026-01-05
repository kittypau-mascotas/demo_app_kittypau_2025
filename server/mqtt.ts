import * as mqtt from 'mqtt';
import { db } from './db'; // Módulo de conexión a DB
import { deviceHealthReports, devices } from '../shared/schema';
import { eq } from 'drizzle-orm';
import { z } from 'zod';

// Esquema Zod para validar el payload de los reportes de salud
const healthReportPayloadSchema = z.object({
  deviceId: z.string(),
  timestamp: z.string().datetime(),
  firmwareVersion: z.string().optional(),
  overallStatus: z.enum(['PASS', 'FAIL']),
  results: z.record(z.string(), z.unknown()).optional(), // Cambiado a unknown para ser más flexible
});

type HealthReportPayload = z.infer<typeof healthReportPayloadSchema>;

const MQTT_BROKER_URL = process.env.MQTT_BROKER_URL || 'mqtt://broker.hivemq.com'; // Usar un broker público por defecto si no se especifica

export function initializeMqttClient() {
  const client = mqtt.connect(MQTT_BROKER_URL);

  client.on('connect', () => {
    console.log('Conectado al broker MQTT');
    client.subscribe('kittypaw/reports/health', (err) => {
      if (!err) {
        console.log('Suscrito a kittypaw/reports/health');
      } else {
        console.error('Error al suscribirse:', err);
      }
    });
  });

  client.on('message', (topic, message) => {
    if (topic === 'kittypaw/reports/health') {
      handleHealthReport(message);
    }
  });

  client.on('error', (err) => {
    console.error('Error en el cliente MQTT:', err);
  });

  client.on('offline', () => {
    console.warn('Cliente MQTT desconectado del broker.');
  });

  client.on('reconnect', () => {
    console.log('Cliente MQTT intentando reconectar...');
  });
}

async function handleHealthReport(message: Buffer) {
  try {
    const messageString = message.toString();
    const rawPayload = JSON.parse(messageString);

    // Validar el payload con Zod
    const payload = healthReportPayloadSchema.parse(rawPayload);

    console.log('Reporte de salud recibido:', payload);

    // 1. Validar el Dispositivo
    const existingDevice = await db.query.devices.findFirst({
      where: eq(devices.deviceId, payload.deviceId),
    });

    if (!existingDevice) {
      console.warn(`Dispositivo con ID ${payload.deviceId} no encontrado en la DB. Reporte ignorado.`);
      return;
    }

    // 2. Insertar en la Base de Datos
    await db.insert(deviceHealthReports).values({
      deviceId: existingDevice.id,
      timestamp: new Date(payload.timestamp),
      firmwareVersion: payload.firmwareVersion,
      report: messageString, // Guardamos el JSON completo como string
      overallStatus: payload.overallStatus,
    });

    console.log(`Reporte de salud para ${payload.deviceId} guardado exitosamente.`);

  } catch (error) {
    console.error('Error procesando reporte de salud MQTT:', error);
  }
}
