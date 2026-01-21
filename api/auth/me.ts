import type { VercelRequest, VercelResponse } from "@vercel/node";
import { db } from "@lib/db";
import { users } from "@shared/schema";
import { eq } from "drizzle-orm";
import cookie from "cookie";

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // Solo permitir GET
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // 1. Leer cookies
  const cookies = cookie.parse(req.headers.cookie || "");
  const sessionUserId = cookies.kittypau_session;

  if (!sessionUserId) {
    return res.status(401).json({ user: null });
  }

  try {    
  // 2. Buscar usuario en DB
  const [user] = await db
    .select({
      id: users.id,
      email: users.email,
      name: users.fullName,
    })
    .from(users)
    .where(eq(users.id, Number(sessionUserId)))
    .limit(1);

    if (!user) {
      // Si la cookie es inválida, la limpiamos
      res.setHeader("Set-Cookie", cookie.serialize("kittypau_session", "", { maxAge: -1, path: "/" }));
      return res.status(401).json({ user: null, error: "Sesión inválida" });
    }

    // 3. Retornar usuario
    return res.status(200).json({ user });
  } catch (error) {
    console.error("❌ /api/auth/me error:", error);
    return res.status(500).json({ user: null, error: "Internal server error" });
  }
}
