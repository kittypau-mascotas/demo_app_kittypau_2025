import type { Request, Response } from 'express';

export async function getUser(req: Request): Promise<{ appUserId: number } | null> {
  // STUB: This is a placeholder. Implement real session validation.
  return { appUserId: 1 };
}

export function sendError(res: Response, error: any, status = 500) {
  // STUB: This is a placeholder. Implement real error handling.
  console.error("[STUB] sendError called:", error);
  res.status(status).json({ error: "An error occurred." });
}