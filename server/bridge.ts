import 'dotenv/config';
import * as mqtt from 'mqtt';
import { db } from './db';
import { devices, deviceEvents, sensorReadings } from '../shared/schema';
import { eq } from 'drizzle-orm';
import { z } from 'zod';
import * as fs from 'fs';
import * as path from 'path';

// --- MQTT Schemas ---
export const deviceStatusPayloadSchema = z.object({
  status: z.enum([
    'online',
    'offline',
    'reboot',
    'error',
    'low_battery',
    'sensor_error'
  ]),
});

export type DeviceStatusPayload = z.infer<typeof deviceStatusPayloadSchema>;

export const deviceDataPayloadSchema = z.object({
  ts: z.string().datetime().optional(), // ISO 8601 format
  temp: z.number().optional(),
  hum: z.number().optional(),
  light: z.number().optional(),
  weight: z.number().optional(),
});

export type DeviceDataPayload = z.infer<typeof deviceDataPayloadSchema>;

// --- MQTT Client ---

function initializeMqttClient() {
  const AWS_IOT_ENDPOINT = process.env.AWS_IOT_ENDPOINT;

  if (!AWS_IOT_ENDPOINT) {
    console.error('AWS_IOT_ENDPOINT is not set. MQTT client will not start.');
    console.warn('For development, you can set AWS_IOT_ENDPOINT to a public broker like "mqtt://broker.hivemq.com"');
    return;
  }
  
  let client;
  
  if (AWS_IOT_ENDPOINT.startsWith('mqtt://')) {
    console.warn(`Connecting to an unsecured MQTT broker at ${AWS_IOT_ENDPOINT}. THIS IS FOR DEVELOPMENT ONLY!`);
    client = mqtt.connect(AWS_IOT_ENDPOINT);
  } else {
    const PRIVATE_KEY_PATH = process.env.AWS_IOT_PRIVATE_KEY_PATH;
    const CERTIFICATE_PATH = process.env.AWS_IOT_CERT_PATH;
    const ROOT_CA_PATH = process.env.AWS_IOT_ROOT_CA_PATH;

    if (!PRIVATE_KEY_PATH || !CERTIFICATE_PATH || !ROOT_CA_PATH) {
      console.error('AWS IoT certificate paths (AWS_IOT_PRIVATE_KEY_PATH, AWS_IOT_CERT_PATH, AWS_IOT_ROOT_CA_PATH) must be set for mTLS connection.');
      return;
    }

    const clientOptions: mqtt.IClientOptions = {
      host: AWS_IOT_ENDPOINT,
      protocol: 'mqtts',
      clientId: `kittypau-bridge-${Math.random().toString(16).substr(2, 8)}`,
      key: fs.readFileSync(path.resolve(PRIVATE_KEY_PATH)),
      cert: fs.readFileSync(path.resolve(CERTIFICATE_PATH)),
      ca: fs.readFileSync(path.resolve(ROOT_CA_PATH)),
      reconnectPeriod: 5000,
      qos: 1,
    };
    client = mqtt.connect(clientOptions);
  }

  setupMqttEventHandlers(client);
}

function setupMqttEventHandlers(client: mqtt.MqttClient) {
  client.on('connect', () => {
    console.log(`Conectado al broker MQTT: ${client.options.host}`);
    
    const topics = ['kittypau/+/data', 'kittypau/+/status'];
    client.subscribe(topics, { qos: 1 }, (err, granted) => {
      if (err) {
        console.error('Error al suscribirse a los tópicos:', err);
        return;
      }
      granted.forEach(grant => {
        console.log(`Suscrito a "${grant.topic}" con QoS ${grant.qos}`);
      });
    });
  });

  client.on('message', (topic, message) => {
    handleMqttMessage(topic, message);
  });

  client.on('error', (err) => console.error('Error en el cliente MQTT:', err));
  client.on('offline', () => console.warn('Cliente MQTT desconectado.'));
  client.on('reconnect', () => console.log('Intentando reconectar al broker MQTT...'));
}

async function handleMqttMessage(topic: string, message: Buffer) {
  try {
    const messageString = message.toString();
    const rawPayload = JSON.parse(messageString);
    const topicParts = topic.split('/');
    const deviceId = topicParts[1];

    if (!deviceId) {
      console.warn(`Mensaje en tópico inválido (sin deviceId): ${topic}`);
      return;
    }

    if (topic.endsWith('/data')) {
      await handleDeviceData(deviceId, rawPayload);
    } else if (topic.endsWith('/status')) {
      await handleDeviceStatus(deviceId, rawPayload);
    } else {
      console.log(`Mensaje recibido en tópico no manejado ${topic}:`, rawPayload);
    }

  } catch (error) {
    console.error(`Error procesando mensaje MQTT del tópico ${topic}:`, error);
  }
}

async function handleDeviceData(deviceIdStr: string, rawPayload: any) {
  try {
    const payload = deviceDataPayloadSchema.parse(rawPayload);
    console.log(`[DATA] de ${deviceIdStr}:`, payload);

    await db.insert(sensorReadings).values({
      ts: payload.ts ? new Date(payload.ts) : new Date(),
      deviceId: deviceIdStr,
      temperatureCelsius: payload.temp,
      humidityPercent: payload.hum,
      lightLux: payload.light,
      weightGrams: payload.weight,
    });

    await db.update(devices)
      .set({ lastSeen: new Date() })
      .where(eq(devices.deviceId, deviceIdStr));
      
    console.log(`-> Lectura de sensor para ${deviceIdStr} guardada.`);

  } catch (error) {
    console.error(`Error de validación o DB en datos de sensor para ${deviceIdStr}:`, error);
  }
}

async function handleDeviceStatus(deviceIdStr: string, rawPayload: any) {
  try {
    const payload = deviceStatusPayloadSchema.parse(rawPayload);
    console.log(`[STATUS] de ${deviceIdStr}:`, payload);
    const now = new Date();

    await db.insert(deviceEvents).values({
      deviceId: deviceIdStr,
      eventType: payload.status,
      ts: now,
    });
    
    await db.update(devices)
      .set({
        status: payload.status,
        lastSeen: now,
      })
      .where(eq(devices.deviceId, deviceIdStr));
      
    console.log(`-> Evento '${payload.status}' para ${deviceIdStr} guardado y estado actualizado.`);
      
  } catch (error) {
    console.error(`Error de validación o DB en estado de dispositivo para ${deviceIdStr}:`, error);
  }
}

// --- Main function ---
function main() {
    console.log('Iniciando Bridge MQTT...');
    initializeMqttClient();
}

main();
