import { Request, Response, NextFunction } from "express";
import { getSession } from "@neondatabase/serverless/auth";

export type NeonUser = {
  id: string;
  email: string;
  name?: string;
};

export async function requireNeonAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    // Usar la función oficial de Neon para obtener la sesión.
    // Esta función sabe cómo construir la petición correcta al endpoint de Neon.
    const session = await getSession(req);

    if (!session || !session.user) {
      // Si no hay sesión, denegar el acceso.
      return res.status(401).json({ error: "Unauthorized: No valid session found" });
    }

    // La sesión es válida, adjuntar los datos del usuario a la petición.
    req.neonUser = {
      id: session.user.id,
      email: session.user.email,
      name: session.user.name,
    };

    next();
  } catch (err) {
    console.error("[Neon Auth] Error in getSession:", err);
    res.status(500).json({ error: "Internal Server Error during auth check" });
  }
}
