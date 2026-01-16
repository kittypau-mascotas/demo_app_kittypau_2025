import type { Request, Response } from 'express';
import { getUser, sendError } from '../lib/api-utils';
import { db } from '../shared/db';
import { devices } from '../shared/schema';
import { eq, desc } from 'drizzle-orm';

export default async function handler(req: Request, res: Response) {
  // 1. Solo GET permitido
  if (req.method !== 'GET') {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // 2. Autenticación obligatoria
  const user = await getUser(req);
  if (!user) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    // 3. Consulta Multi-tenant (Filtrado por user.appUserId)
    const userDevices = await db.select()
      .from(devices)
      .where(eq(devices.userId, user.appUserId))
      .orderBy(desc(devices.lastSeen));

    return res.status(200).json(userDevices);
  } catch (error) {
    return sendError(res, error);
  }
}