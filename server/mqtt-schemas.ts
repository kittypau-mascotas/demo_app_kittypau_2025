import { z } from 'zod';

// Este archivo define los esquemas de validación (usando Zod) para los payloads
// que se esperan recibir a través de MQTT.

/**
 * Esquema para los mensajes de estado del dispositivo.
 * Se espera en el tópico: kittypau/{deviceId}/status
 * Ejemplo: { "status": "online" }
 */
export const deviceStatusPayloadSchema = z.object({
  // Usamos un enum para asegurar que solo los valores de estado definidos en la DB sean válidos.
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


/**
 * Esquema para los mensajes de datos de sensores.
 * Se espera en el tópico: kittypau/{deviceId}/data
 * El timestamp es opcional; si no se provee, se usará el tiempo del servidor.
 * Los valores de los sensores son opcionales, ya que un dispositivo podría enviar solo algunos.
 * 
 * Ejemplo:
 * {
 *   "ts": "2026-01-08T19:32:10Z",
 *   "temp": 22.4,
 *   "hum": 58,
 *   "light": 610,
 *   "weight": 120.3
 * }
 */
export const deviceDataPayloadSchema = z.object({
  ts: z.string().datetime().optional(), // ISO 8601 format
  temp: z.number().optional(),
  hum: z.number().optional(),
  light: z.number().optional(),
  weight: z.number().optional(),
});

export type DeviceDataPayload = z.infer<typeof deviceDataPayloadSchema>;