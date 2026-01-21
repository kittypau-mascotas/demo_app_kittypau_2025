import type { VercelRequest, VercelResponse } from "@vercel/node";
import { serialize } from 'cookie';

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // Expira la cookie de sesión
  const sessionCookie = serialize("kittypau_session", "", {
    maxAge: -1, // Expira inmediatamente
    path: "/",
  });

  res.setHeader("Set-Cookie", sessionCookie);
  return res.status(200).json({ message: "Logout successful" });
}