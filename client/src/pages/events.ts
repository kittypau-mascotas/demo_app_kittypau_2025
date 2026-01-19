import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getUser, sendError } from '@lib/api-utils';
import { db } from '@shared/db';
import { deviceEvents, devices } from '@shared/schema';
import { eq, desc, inArray } from 'drizzle-orm';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const user = await getUser(req);
  if (!user) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    // 1. Encontrar todos los dispositivos del usuario
    const userDevices = await db.query.devices.findMany({
      where: eq(devices.userId, user.appUserId),
      columns: {
        id: true,
      },
    });

    if (userDevices.length === 0) {
      return res.json([]); // Sin dispositivos, no hay eventos
    }

    const deviceIds = userDevices.map(d => d.id);

    // 2. Obtener los eventos recientes de esos dispositivos
    const events = await db.query.deviceEvents.findMany({
      where: inArray(deviceEvents.deviceId, deviceIds),
      orderBy: [desc(deviceEvents.ts)],
      limit: 100, // Limitar a los últimos 100 eventos para un buen rendimiento
    });

    res.json(events);
  } catch (e) {
    return sendError(res, e);
  }
}