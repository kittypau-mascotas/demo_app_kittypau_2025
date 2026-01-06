import * as mqtt from 'mqtt';
import { db } from './db'; // Módulo de conexión a DB
import { deviceHealthReports, devices, sensorReadings } from '../shared/schema'; // Added sensorReadings
import { eq } from 'drizzle-orm';
import {
  healthReportPayloadSchema,
  sensorReadingPayloadSchema,
  HealthReportPayload,
  SensorReadingPayload
} from './mqtt-schemas'; // Import from new schema file
import * as fs from 'fs'; // For reading cert files
import * as path from 'path'; // For resolving cert paths

// Type for the WebSocket broadcast function
type WebSocketBroadcast = (topic: string, message: any) => void;

export function initializeMqttClient(broadcast: WebSocketBroadcast) { // Accept broadcast function
  const AWS_IOT_ENDPOINT = process.env.AWS_IOT_ENDPOINT;
  const AWS_REGION = process.env.AWS_REGION;
  const MQTT_CLIENT_ID = process.env.MQTT_CLIENT_ID || `kittypau-iot-bridge-${Math.random().toString(16).substr(2, 8)}`;

  if (!AWS_IOT_ENDPOINT || !AWS_REGION) {
    console.error('AWS_IOT_ENDPOINT and AWS_REGION must be set in environment variables.');
    // Fallback to a public broker for development if AWS IoT is not configured
    // This is not recommended for production.
    const client = mqtt.connect('mqtt://broker.hivemq.com');
    console.warn('Connecting to a public MQTT broker (HiveMQ) due to missing AWS IoT environment variables. THIS IS FOR DEVELOPMENT ONLY!');
    setupMqttEventHandlers(client, broadcast);
    return;
  }

  // Paths to certificates
  const PRIVATE_KEY_PATH = process.env.AWS_IOT_PRIVATE_KEY_PATH;
  const CERTIFICATE_PATH = process.env.AWS_IOT_CERT_PATH;
  const ROOT_CA_PATH = process.env.AWS_IOT_ROOT_CA_PATH;

  if (!PRIVATE_KEY_PATH || !CERTIFICATE_PATH || !ROOT_CA_PATH) {
    console.error('AWS IoT certificate paths (AWS_IOT_PRIVATE_KEY_PATH, AWS_IOT_CERT_PATH, AWS_IOT_ROOT_CA_PATH) must be set in environment variables.');
    // Fallback to public broker if certs are missing, for dev only
    const client = mqtt.connect('mqtt://broker.hivemq.com');
    console.warn('Connecting to a public MQTT broker (HiveMQ) due to missing AWS IoT certificate paths. THIS IS FOR DEVELOPMENT ONLY!');
    setupMqttEventHandlers(client, broadcast);
    return;
  }

  const clientOptions: mqtt.IClientOptions = {
    host: AWS_IOT_ENDPOINT.split('://')[1] || AWS_IOT_ENDPOINT, // Extract hostname
    protocol: 'mqtts', // AWS IoT Core uses mqtts for mTLS
    clientId: MQTT_CLIENT_ID,
    key: fs.readFileSync(path.resolve(PRIVATE_KEY_PATH)),
    cert: fs.readFileSync(path.resolve(CERTIFICATE_PATH)),
    ca: fs.readFileSync(path.resolve(ROOT_CA_PATH)),
    reconnectPeriod: 5000, // Reconnect every 5 seconds
    qos: 1, // At least once delivery
  };

  const client = mqtt.connect(clientOptions);

  client.on('connect', () => {
    console.log('Conectado al broker MQTT de AWS IoT Core.');
    // Subscribe to general sensor data topic
    client.subscribe('kittypau/+/data/sensors', { qos: 1 }, (err) => {
      if (!err) {
        console.log('Suscrito a kittypau/+/data/sensors');
      } else {
        console.error('Error al suscribirse a kittypau/+/data/sensors:', err);
      }
    });
    // Subscribe to general health reports topic (assuming it follows the deviceId pattern)
    client.subscribe('kittypau/+/health', { qos: 1 }, (err) => {
      if (!err) {
        console.log('Suscrito a kittypau/+/health');
      }
    });
    // Subscribe to command topic (for all devices, bridge will filter or devices will use specific)
    client.subscribe('kittypau/+/cmnd/#', { qos: 1 }, (err) => { // Using # for subtopics
      if (!err) {
        console.log('Suscrito a kittypau/+/cmnd/#');
      } else {
        console.error('Error al suscribirse a kittypau/+/cmnd/#:', err);
      }
    });
  });


  setupMqttEventHandlers(client, broadcast); // Call the new setup function
}

function setupMqttEventHandlers(client: mqtt.MqttClient, broadcast: WebSocketBroadcast) {
  client.on('message', (topic, message) => {
    handleMqttMessage(topic, message, broadcast);
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

async function handleMqttMessage(topic: string, message: Buffer, broadcast: WebSocketBroadcast) {
  try {
    const messageString = message.toString();
    const rawPayload = JSON.parse(messageString);
    const topicParts = topic.split('/');
    const deviceId = topicParts[1]; // Assuming topic format kittypau/{deviceId}/...

    if (!deviceId) {
      console.warn(`Mensaje MQTT en tópico inválido (sin deviceId): ${topic}`);
      return;
    }

    // Find the device in the database
    const existingDevice = await db.query.devices.findFirst({
      where: eq(devices.deviceId, deviceId),
    });

    if (!existingDevice) {
      console.warn(`Dispositivo con ID ${deviceId} no encontrado en la DB para tópico ${topic}. Mensaje ignorado.`);
      return;
    }

    if (topic.includes('/data/sensors')) {
      await handleSensorData(deviceId, rawPayload, existingDevice.id, broadcast);
    } else if (topic.includes('/health')) {
      await handleDeviceHealth(deviceId, rawPayload, existingDevice.id, broadcast);
    } else if (topic.includes('/cmnd/')) {
      console.log(`Comando MQTT recibido para ${deviceId} en tópico ${topic}:`, rawPayload);
      // Here you would implement logic to send commands back to the device
      // e.g., if it's set_wifi, parse and store the command
    } else {
      console.log(`Mensaje MQTT recibido en tópico no manejado ${topic}:`, rawPayload);
    }

  } catch (error) {
    console.error('Error procesando mensaje MQTT:', error);
  }
}

async function handleSensorData(
  deviceIdStr: string,
  rawPayload: any,
  dbDeviceId: number, // Use number if Drizzle schema uses serial for device ID
  broadcast: WebSocketBroadcast
) {
  try {
    const payload = sensorReadingPayloadSchema.parse(rawPayload);
    console.log(`Lectura de sensor de ${deviceIdStr} recibida:`, payload);

    await db.insert(sensorReadings).values({
      deviceId: dbDeviceId,
      timestamp: new Date(payload.timestamp),
      type: payload.sensorType,
      value: payload.value,
      unit: payload.unit,
    });

    console.log(`Lectura de sensor para ${deviceIdStr} guardada y emitida.`);
    broadcast(`sensorData/${deviceIdStr}`, payload); // Broadcast real-time data
  } catch (error) {
    console.error(`Error procesando datos de sensor para ${deviceIdStr}:`, error);
  }
}

async function handleDeviceHealth(
  deviceIdStr: string,
  rawPayload: any,
  dbDeviceId: number, // Use number if Drizzle schema uses serial for device ID
  broadcast: WebSocketBroadcast
) {
  try {
    const payload = healthReportPayloadSchema.parse(rawPayload);
    console.log(`Reporte de salud de ${deviceIdStr} recibido:`, payload);

    await db.insert(deviceHealthReports).values({
      deviceId: dbDeviceId,
      timestamp: new Date(payload.timestamp),
      firmwareVersion: payload.firmwareVersion,
      report: JSON.stringify(rawPayload), // Guardar el JSON completo como string
      overallStatus: payload.overallStatus,
    });

    console.log(`Reporte de salud para ${deviceIdStr} guardado y emitido.`);
    broadcast(`deviceHealth/${deviceIdStr}`, payload); // Broadcast real-time data
  } catch (error) {
    console.error(`Error procesando reporte de salud para ${deviceIdStr}:`, error);
  }
}
