import { betterAuth } from "better-auth";
import { db } from "../db";
import { users } from "../../shared/schema";

if (!process.env.AUTH_SECRET) {
  throw new Error(
    "AUTH_SECRET is not set. Please set it in your .env file"
  );
}

export const auth = betterAuth({
  db: db,
  users: users,
  secret: process.env.AUTH_SECRET,
  baseURL: process.env.VITE_API_URL || "http://localhost:3000",
});
