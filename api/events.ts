import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getUser, verifyDeviceOwnership, dateSchema, limitSchema, sendError } from '../lib/api-utils';
import { db } from '@shared/db';
import { deviceEvents } from '@shared/schema';
import { eq, and, sql, desc } from 'drizzle-orm';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Solo permitimos GET
  if (req.method !== 'GET') return res.status(405).json({ error: "Method not allowed" });

  // 1. Autenticación
  const user = await getUser(req);
  if (!user) return res.status(401).json({ error: "Unauthorized" });

  // 2. Obtener parámetros (Vercel inyecta path params en req.query)
  const { deviceId, start_date, end_date, limit } = req.query;

  if (!deviceId || typeof deviceId !== 'string') {
    return res.status(400).json({ error: "Device ID is required" });
  }

  try {
    // 3. Verificar propiedad del dispositivo
    const device = await verifyDeviceOwnership(user.appUserId, deviceId);
    if (!device) {
      return res.status(404).json({ message: "Device not found or not owned by user" });
    }

    // 4. Validar filtros opcionales
    const parsedStart = dateSchema.parse(start_date);
    const parsedEnd = dateSchema.parse(end_date);
    const parsedLimit = limitSchema.parse(limit);

    // 5. Consultar base de datos
    const events = await db.query.deviceEvents.findMany({
      where: and(
        eq(deviceEvents.deviceId, deviceId),
        parsedStart ? sql`${deviceEvents.ts} >= ${new Date(parsedStart)}` : undefined,
        parsedEnd ? sql`${deviceEvents.ts} <= ${new Date(parsedEnd)}` : undefined
      ),
      orderBy: [desc(deviceEvents.ts)],
      limit: parsedLimit || 50 // Límite por defecto para proteger rendimiento
    });

    res.json(events);
  } catch (e) {
    return sendError(res, e);
  }
}