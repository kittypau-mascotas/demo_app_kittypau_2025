import type { VercelRequest, VercelResponse } from "@vercel/node";
import { db } from "../../lib/db";
import { users } from "../../shared/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";
import { serialize } from "cookie";
import { randomUUID } from "crypto"; // Native Node.js module

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { fullName, email, password } = req.body;

  if (!fullName || !email || !password) {
    return res.status(400).json({ error: "Nombre, email y contraseña son requeridos" });
  }

  if (password.length < 6) {
    return res.status(400).json({ error: "La contraseña debe tener al menos 6 caracteres" });
  }

  try {
    // 1. Check if user already exists
    const [existingUser] = await db
      .select({ id: users.id })
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (existingUser) {
      return res.status(409).json({ error: "Ya existe un usuario con este email" });
    }

    // 2. Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // 3. Create the new user
    const authUserId = randomUUID();

    const [newUser] = await db
      .insert(users)
      .values({
        fullName,
        email,
        password: hashedPassword,
        authUserId: authUserId,
      })
      .returning();

    // 4. Create a session cookie and log the user in
    const sessionCookie = serialize("kittypau_session", newUser.id.toString(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 1 week
    });

    res.setHeader("Set-Cookie", sessionCookie);

    // 5. Return the new user's data
    return res.status(201).json(newUser);
  } catch (error) {
    console.error("Registration error:", error);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
}