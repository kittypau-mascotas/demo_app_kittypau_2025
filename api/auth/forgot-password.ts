import type { VercelRequest, VercelResponse } from '@vercel/node';
import pool from '../db';
import { randomBytes } from 'crypto';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email requerido' });
  }

  const client = await pool.connect();

  try {
    const result = await client.query('SELECT id FROM users WHERE email = $1', [email]);
    
    if (result.rowCount > 0) {
      const user = result.rows[0];
      const token = randomBytes(32).toString('hex');
      const expiresAt = new Date(Date.now() + 3600000); // 1 hora de validez

      await client.query(
        'INSERT INTO password_resets (user_id, token, expires_at) VALUES ($1, $2, $3)',
        [user.id, token, expiresAt]
      );

      // SIMULACIÓN DE EMAIL: Verás esto en los logs de Vercel (vercel logs demo-app...)
      const resetLink = `https://${req.headers.host}/reset-password?token=${token}`;
      console.log(`[EMAIL MOCK] Recuperación para ${email}. Link: ${resetLink}`);
    }

    // Siempre respondemos OK por seguridad para no revelar qué emails existen
    return res.status(200).json({ message: 'Si el correo existe, recibirás instrucciones.' });
  } catch (error) {
    console.error('Forgot password error:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  } finally {
    client.release();
  }
}