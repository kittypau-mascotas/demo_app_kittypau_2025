import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../db";

if (!process.env.AUTH_SECRET) {
  throw new Error(
    "AUTH_SECRET is not set. Please set it in your .env file"
  );
}
if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL is not set. Please set it in your .env file"
  );
}

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  secret: process.env.AUTH_SECRET,
  baseURL: process.env.BETTER_AUTH_URL || process.env.NEON_AUTH_URL || "https://demo-app-kittypau-2025.vercel.app",
  trustedOrigins: [
    "https://demo-app-kittypau-2025.vercel.app",
    "http://localhost:3000"
  ]
});
