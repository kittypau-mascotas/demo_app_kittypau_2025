import type { VercelRequest, VercelResponse } from '@vercel/node';
import pool from '../db'; 
import { hash } from 'bcrypt';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

  const { email, password, name } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email y contraseña requeridos' });
  }

  try {
    const hashedPassword = await hash(password, 10);
    const client = await pool.connect();

    try {
      await client.query('BEGIN');

      // 1. Crear Usuario
      const userRes = await client.query(
        `INSERT INTO users (email, password, name) VALUES ($1, $2, $3) RETURNING id, email, name`,
        [email, hashedPassword, name]
      );
      const user = userRes.rows[0];

      // 2. Crear Settings iniciales
      await client.query(
        `INSERT INTO user_settings (user_id) VALUES ($1)`,
        [user.id]
      );

      await client.query('COMMIT');
      
      return res.status(201).json({ user, message: 'Usuario registrado con éxito' });

    } catch (err: any) {
      await client.query('ROLLBACK');
      if (err.code === '23505') {
        return res.status(409).json({ error: 'El email ya está registrado' });
      }
      throw err;
    } finally {
      client.release();
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
}