import type { VercelRequest, VercelResponse } from '@vercel/node';
import { db } from '../lib/db';
import { devices } from '../shared/schema';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const allDevices = await db.select().from(devices);
    return res.status(200).json(allDevices);
  } catch (error) {
    console.error('Error fetching devices:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}