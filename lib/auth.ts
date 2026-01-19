import { betterAuth } from "better-auth";
import { neonAdapter } from "better-auth/adapters/neon";
import { db } from "./db";

export const auth = betterAuth({
  database: neonAdapter(db),
  emailAndPassword: {
    enabled: true
  },
  trustedOrigins: ["https://TU-DOMINIO.vercel.app"]
});

export const GET = auth.handler;
export const POST = auth.handler;
