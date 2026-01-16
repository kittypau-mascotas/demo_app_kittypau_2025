import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../../shared/db";

let authInstance: any = null;

try {
  authInstance = betterAuth({
    database: drizzleAdapter(db, { provider: "pg" }),
    secret: process.env.AUTH_SECRET || "build-secret",
    baseURL: "https://demo-app-kittypau-2025.vercel.app",
    trustedOrigins: [
      "https://demo-app-kittypau-2025.vercel.app",
      "http://localhost:3000",
    ],
  });

  console.log("✅ Better Auth initialized");
} catch (err) {
  console.error("❌ Better Auth init failed", err);
}

export const auth = authInstance;
