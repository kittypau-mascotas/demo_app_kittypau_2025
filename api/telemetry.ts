import type { VercelRequest, VercelResponse } from '@vercel/node';
import { db } from '../lib/db';
import { sensorReadings } from '../shared/schema';
import { eq, desc, and, gte, lte } from 'drizzle-orm';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { deviceId, limit = '50', start_date, end_date } = req.query;

    if (!deviceId || typeof deviceId !== 'string') {
      return res.status(400).json({ error: 'deviceId is required' });
    }

    const conditions = [eq(sensorReadings.deviceId, deviceId)];

    if (start_date && typeof start_date === 'string') {
      conditions.push(gte(sensorReadings.ts, new Date(start_date)));
    }

    if (end_date && typeof end_date === 'string') {
      conditions.push(lte(sensorReadings.ts, new Date(end_date)));
    }

    const data = await db.select().from(sensorReadings).where(and(...conditions)).orderBy(desc(sensorReadings.ts)).limit(parseInt(limit as string));

    return res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching telemetry:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}