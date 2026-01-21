import type { VercelRequest, VercelResponse } from "@vercel/node";
import { db } from "../../lib/db";
import { users } from "../../shared/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";
import { serialize } from "cookie";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Faltan credenciales" });
  }

  try {
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.email, email));

    if (!user) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }

    if (!user.password) {
      return res.status(401).json({ error: "La cuenta no tiene una contraseña configurada." });
    }

    // NOTA: Tu schema 'users' debe tener un campo 'password' con el hash para que esto funcione.
    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }

    const sessionCookie = serialize("kittypau_session", user.id.toString(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 1 semana
    });

    res.setHeader("Set-Cookie", sessionCookie);
    res.status(200).json({
      id: user.id,
      email: user.email,
      name: user.fullName,
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
}
