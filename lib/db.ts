import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import * as schema from './schema';
import "dotenv/config";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  console.warn("⚠️ DATABASE_URL is missing! DB operations will fail.");
}

const sql = neon(databaseUrl || "postgresql://neondb_owner:npg_iVL1xhT6ICwp@ep-restless-wave-ad7zlaq8-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require");
export const db = drizzle(sql, { schema });