import type { Request, Response } from 'express';

export default function handler(req: Request, res: Response) {
  res.status(200).json({ 
    status: 'ok', 
    message: 'Auth routing is working',
    env_check: !!process.env.AUTH_SECRET // Devuelve true si existe, false si no
  });
}