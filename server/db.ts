import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import * as schema from '../shared/schema';
import "dotenv/config"; // ✅ Carga automática de .env en local

// 🛡️ FIX: No lanzar error en el top-level.
// Si DATABASE_URL falta, usamos un string vacío o placeholder para permitir que la app arranque
// y el endpoint /api/health pueda reportar el error en lugar de crashear la lambda.
const databaseUrl = process.env.DATABASE_URL || "postgres://placeholder:placeholder@placeholder.neondatabase.cloud/placeholder";
if (!process.env.DATABASE_URL) {
  console.warn("⚠️ DATABASE_URL is missing! DB operations will fail.");
}

const sql = neon(databaseUrl);
export const db = drizzle(sql, { schema });
