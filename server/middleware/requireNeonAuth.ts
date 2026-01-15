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
      // Enhanced error logging
      const errorBody = await response.text();
      console.error(`[Neon Auth] Session check failed with status: ${response.status} ${response.statusText}`);
      console.error("[Neon Auth] Response body:", errorBody);
      return res.status(401).json({ 
        error: "Unauthorized", 
        neon_auth_status: response.status,
        neon_auth_response: errorBody 
      });
    }

    const data = await response.json();

    req.neonUser = {
      id: data.user.id,
      email: data.user.email,
      name: data.user.name,
    };

    next();
  } catch (err) {
    console.error("[Neon Auth] Catch block error:", err);
    res.status(500).json({ error: "Internal Server Error during auth check" });
  }
}
