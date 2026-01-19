import { z } from 'zod';

export function toWebHeaders(nodeHeaders: any): Headers {
  const headers = new Headers();
  for (const [key, value] of Object.entries(nodeHeaders)) {
    if (Array.isArray(value)) {
      value.forEach(v => headers.append(key, v as string));
    } else if (typeof value === 'string') {
      headers.append(key, value);
    }
  }
  return headers;
}

export const dateSchema = z.string().optional();
export const limitSchema = z.string().optional().transform(val => val ? parseInt(val) : undefined);

export async function getUser(req: any) {
  // Basic implementation to get user from header (as used in your other endpoints)
  const userId = req.headers['x-user-id'];
  if (userId) return { appUserId: userId };
  return null;
}

export async function verifyDeviceOwnership(userId: string, deviceId: string) {
  // Mock implementation - in a real scenario, check DB
  return true; 
}

export function sendError(res: any, error: any) {
  console.error(error);
  res.status(500).json({ error: error.message || 'Internal Server Error' });
}
