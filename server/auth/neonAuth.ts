import { betterAuth } from "better-auth";

export const auth = betterAuth({
  baseURL: process.env.NEON_AUTH_URL!,
  secret: process.env.AUTH_SECRET!,
});