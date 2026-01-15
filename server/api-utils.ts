// Using Express types as a compatible fallback since @vercel/node is missing
import type { Request as VercelRequest, Response as VercelResponse } from 'express';
import { auth } from "./auth/neonAuth";
import { db } from "./db";
import { users, devices } from "../shared/schema";
import { eq, and } from "drizzle-orm";
import { z } from "zod";

// --- Schemas de Validación Comunes ---
export const dateSchema = z.string().datetime({ message: "Invalid date format, expected ISO 8601" }).optional();
export const limitSchema = z.string().regex(/^\d+$/, "Limit must be a number").transform(Number).optional();

// --- Helpers ---

// Convierte headers de Node.js a Web Standard Headers (necesario para Better Auth)
export function toWebHeaders(nodeHeaders: import("http").IncomingHttpHeaders): Headers {
  const headers = new Headers();
  for (const [k, v] of Object.entries(nodeHeaders)) {
    if (typeof v === "string") headers.append(k, v);
    else if (Array.isArray(v)) v.forEach((x) => headers.append(k, x));
  }
  return headers;
}

// Obtiene el usuario autenticado y asegura que exista en la tabla 'users'
export async function getUser(req: VercelRequest) {
  try {
    const session = await auth.api.getSession({
      headers: toWebHeaders(req.headers),
    });

    if (!session || !session.user) {
      return null;
    }

    // Lógica de aprovisionamiento (Buscar o Crear usuario en tabla 'users')
    let user = await db.query.users.findFirst({
      where: eq(users.authUserId, session.user.id),
    });

    if (!user) {
      const [created] = await db
        .insert(users)
        .values({
          authUserId: session.user.id,
          email: session.user.email,
          fullName: session.user.name || session.user.email.split("@")[0],
        })
        .returning();
      user = created;
    }

    return { ...session.user, appUserId: user.id };
  } catch (error) {
    console.error("Error getting user session:", error);
    return null;
  }
}

// Verifica que el dispositivo pertenezca al usuario autenticado
export async function verifyDeviceOwnership(appUserId: number, deviceId: string) {
  const device = await db.query.devices.findFirst({
    where: and(
      eq(devices.deviceId, deviceId),
      eq(devices.userId, appUserId)
    )
  });
  return device;
}

// Manejo estandarizado de errores
export function sendError(res: VercelResponse, error: any, status = 500) {
  console.error(error);
  if (error instanceof z.ZodError) {
    return res.status(400).json({ error: error.errors });
  }
  res.status(status).json({ error: error.message || "Internal Server Error" });
}