import type { Request, Response } from 'express';

export default function handler(req: Request, res: Response) {
  res.status(200).json({ 
    status: 'ok', 
    message: 'Serverless API is working',
    timestamp: new Date().toISOString() 
  });
}