import type { Express, Request, Response, NextFunction } from "express";
import { auth } from "./auth/neonAuth";
import { db } from "./db";
import {
  users,
  devices,
  pets,
  sensorReadings,
  deviceEvents,
} from "../shared/schema";
import { eq, and, sql, desc } from "drizzle-orm";
import { z } from "zod";

/* -------------------------------------------------------------------------- */
/*                         TYPES EXTENSION                                     */
/* -------------------------------------------------------------------------- */
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
        name?: string;
      };
      appUserId?: number;
      deviceRecord?: any;
    }
  }
}

/* -------------------------------------------------------------------------- */
/*                         HELPERS                                             */
/* -------------------------------------------------------------------------- */
function toWebHeaders(
  nodeHeaders: import("http").IncomingHttpHeaders
): Headers {
  const headers = new Headers();
  for (const [k, v] of Object.entries(nodeHeaders)) {
    if (typeof v === "string") headers.append(k, v);
    if (Array.isArray(v)) v.forEach((x) => headers.append(k, x));
  }
  return headers;
}

/* -------------------------------------------------------------------------- */
/*                         AUTH MIDDLEWARE                                     */
/* -------------------------------------------------------------------------- */
const requireAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const session = await auth.api.getSession({
      headers: toWebHeaders(req.headers),
    });

    if (!session) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    req.user = session.user;

    let userRecord = await db.query.users.findFirst({
      where: eq(users.authUserId, session.user.id),
    });

    if (!userRecord) {
      const [created] = await db
        .insert(users)
        .values({
          authUserId: session.user.id,
          email: session.user.email,
          fullName:
            session.user.name ??
            session.user.email.split("@")[0],
        })
        .returning();

      userRecord = created;
    }

    req.appUserId = userRecord.id;
    next();
  } catch (err) {
    console.error("Auth error:", err);
    res.status(500).json({ error: "Auth failure" });
  }
};

/* -------------------------------------------------------------------------- */
/*                         ROUTES                                              */
/* -------------------------------------------------------------------------- */
export async function registerRoutes(app: Express) {
  /* ========================== */
  /* PUBLIC ROUTES (NO AUTH)    */
  /* ========================== */

  app.get("/api/health", (_req, res) => {
    res.json({
      ok: true,
      service: "kittypau-api",
      env: process.env.NODE_ENV,
      time: new Date().toISOString(),
    });
  });

  app.get("/api/diagnostic", async (_req, res) => {
    try {
      const dbCheck = await db.execute(sql`SELECT now()`);
      res.json({
        status: "ok",
        env: {
          DATABASE_URL: !!process.env.DATABASE_URL,
          AUTH_SECRET: !!process.env.AUTH_SECRET,
        },
        dbTime: (dbCheck.rows[0] as any).now,
      });
    } catch (err: any) {
      res.status(500).json({
        status: "error",
        message: err.message,
      });
    }
  });

  /* ========================== */
  /* PROTECTED ROUTES           */
  /* ========================== */

  app.use("/api", requireAuth);

  app.get("/api/me", (req, res) => {
    res.json({ user: req.user });
  });

  app.post("/api/logout", async (req, res) => {
    await auth.api.signOut({
      headers: toWebHeaders(req.headers),
    });
    res.json({ success: true });
  });

  app.get("/api/devices", async (req, res) => {
    const devicesList = await db
      .select()
      .from(devices)
      .where(eq(devices.userId, req.appUserId!));

    res.json(devicesList);
  });

  app.get("/api/pets", async (req, res) => {
    const result = await db
      .select()
      .from(pets)
      .where(eq(pets.userId, req.appUserId!));

    res.json(result);
  });

  app.get("/api/telemetry", async (req, res) => {
    const result = await db.query.sensorReadings.findMany({
      orderBy: [desc(sensorReadings.ts)],
      limit: 100,
    });
    res.json(result);
  });
}
