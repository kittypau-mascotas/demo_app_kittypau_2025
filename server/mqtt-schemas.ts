import { z } from 'zod';

// Esquema Zod para validar el payload de los reportes de salud
export const healthReportPayloadSchema = z.object({
  deviceId: z.string(),
  timestamp: z.string().datetime(),
  firmwareVersion: z.string().optional(),
  overallStatus: z.enum(['PASS', 'FAIL']),
  // Ajustado para manejar datos arbitrarios dentro de 'results'
  results: z.record(z.string(), z.any()).optional(),
});

export type HealthReportPayload = z.infer<typeof healthReportPayloadSchema>;

// Esquema Zod para validar el payload de lecturas de sensores
export const sensorReadingPayloadSchema = z.object({
  deviceId: z.string(),
  timestamp: z.string().datetime(),
  sensorType: z.string(), // e.g., 'temperature', 'humidity', 'weight', 'motion'
  value: z.number(),
  unit: z.string().optional(), // e.g., '°C', '%', 'g'
});

export type SensorReadingPayload = z.infer<typeof sensorReadingPayloadSchema>;

// Esquema Zod para validar el payload de comandos (ej. set_wifi)
export const commandPayloadSchema = z.object({
  ssid: z.string(),
  password: z.string(),
});

export type CommandPayload = z.infer<typeof commandPayloadSchema>;
