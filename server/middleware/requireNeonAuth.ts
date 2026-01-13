import { Request, Response, NextFunction } from "express";

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
    const response = await fetch(
      `${process.env.NEON_AUTH_URL}/session`,
      {
        headers: {
          cookie: req.headers.cookie ?? "",
        },
      }
    );

    if (!response.ok) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const data = await response.json();

    req.neonUser = {
      id: data.user.id,
      email: data.user.email,
      name: data.user.name,
    };

    next();
  } catch (err) {
    console.error("Neon auth error:", err);
    res.status(401).json({ error: "Unauthorized" });
  }
}
