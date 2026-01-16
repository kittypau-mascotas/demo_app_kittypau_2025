import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import * as schema from './schema';
import "dotenv/config";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  console.warn("⚠️ DATABASE_URL is missing! DB operations will fail.");
}

const sql = neon(databaseUrl || "postgres://placeholder:placeholder@placeholder.neondatabase.cloud/placeholder");
export const db = drizzle(sql, { schema });