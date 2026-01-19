import type { VercelRequest, VercelResponse } from '@vercel/node';
import pool from '../db';
import { hash } from 'bcrypt';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

  const { token, password } = req.body;

  if (!token || !password) {
    return res.status(400).json({ error: 'Token y nueva contraseña requeridos' });
  }

  const client = await pool.connect();

  try {
    // 1. Verificar token y expiración
    const result = await client.query(
      'SELECT user_id FROM password_resets WHERE token = $1 AND expires_at > NOW()',
      [token]
    );

    if (result.rowCount === 0) {
      return res.status(400).json({ error: 'Token inválido o expirado' });
    }

    const userId = result.rows[0].user_id;
    const hashedPassword = await hash(password, 10);

    await client.query('BEGIN');

    // 2. Actualizar contraseña
    await client.query(
      'UPDATE users SET password = $1 WHERE id = $2',
      [hashedPassword, userId]
    );

    // 3. Eliminar token usado (y otros tokens del mismo usuario por seguridad)
    await client.query(
      'DELETE FROM password_resets WHERE user_id = $1',
      [userId]
    );

    await client.query('COMMIT');

    return res.status(200).json({ message: 'Contraseña actualizada correctamente' });
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Reset password error:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  } finally {
    client.release();
  }
}