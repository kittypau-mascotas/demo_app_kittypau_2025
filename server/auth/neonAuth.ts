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
});
