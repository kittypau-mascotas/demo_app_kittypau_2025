import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import * as schema from '../shared/schema';

// Cargar variables de entorno si no estamos en producción
if (process.env.NODE_ENV !== 'production') {
  // En un entorno real, usarías 'dotenv' o similar.
  // Aquí asumimos que DATABASE_URL ya está disponible en el entorno de Replit o se pasó manualmente.
}

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error('DATABASE_URL is not set');
}

const sql = neon(databaseUrl);
export const db = drizzle(sql, { schema });
