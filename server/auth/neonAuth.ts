import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../db";

let authInstance: any = null;

try {
  if (!process.env.AUTH_SECRET) {
    console.error("❌ AUTH_SECRET is missing in environment variables!");
  }

  authInstance = betterAuth({
    database: drizzleAdapter(db, {
      provider: "pg",
    }),
    secret: process.env.AUTH_SECRET || "placeholder-secret-for-build", // Fallback para evitar crash en build
    baseURL: process.env.BETTER_AUTH_URL || process.env.VITE_NEON_AUTH_URL || process.env.NEON_AUTH_URL || "https://demo-app-kittypau-2025.vercel.app",
    trustedOrigins: [
      "https://demo-app-kittypau-2025.vercel.app",
      "http://localhost:3000"
    ]
  });
} catch (error) {
  console.error("❌ Failed to initialize Better Auth:", error);
}

export const auth = authInstance;
