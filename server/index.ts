import "dotenv/config";

import express, { type Request, Response, NextFunction } from "express";
import * as http from "http";

import { registerRoutes } from "./routes";
import { initializeWebSocketServer } from "./websocket";

const app = express();

/* -------------------------------------------------------------------------- */
/*                               RAW BODY FIX                                 */
/* -------------------------------------------------------------------------- */
declare module "http" {
  interface IncomingMessage {
    rawBody?: Buffer;
  }
}

app.use(
  express.json({
    verify: (req, _res, buf) => {
      req.rawBody = buf;
    },
  })
);
app.use(express.urlencoded({ extended: false }));

/* -------------------------------------------------------------------------- */
/*                               HEALTH CHECK                                  */
/* ⚠️ DEBE SER PUBLICO Y ANTES DE CUALQUIER AUTH                                */
/* -------------------------------------------------------------------------- */
app.get("/api/health", (_req, res) => {
  res.status(200).json({
    ok: true,
    service: "kittypau-api",
    env: process.env.NODE_ENV ?? "unknown",
    time: new Date().toISOString(),
  });
});

/* -------------------------------------------------------------------------- */
/*                              REQUEST LOGGER                                 */
/* -------------------------------------------------------------------------- */
app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;

  let capturedJsonResponse: Record<string, unknown> | undefined;
  const originalResJson = res.json.bind(res);

  res.json = (body: any) => {
    capturedJsonResponse = body;
    return originalResJson(body);
  };

  res.on("finish", () => {
    if (!path.startsWith("/api")) return;

    const duration = Date.now() - start;
    let log = `${req.method} ${path} ${res.statusCode} ${duration}ms`;

    if (capturedJsonResponse) {
      const payload = JSON.stringify(capturedJsonResponse);
      log += ` :: ${payload.slice(0, 120)}`;
    }

    // console.log(log); // habilitar solo si lo necesitas
  });

  next();
});

/* -------------------------------------------------------------------------- */
/*                             ROUTES REGISTRATION                             */
/* -------------------------------------------------------------------------- */
async function bootstrap() {
  // 🔐 registerRoutes DEBE manejar internamente:
  // - auth middleware
  // - ownership checks
  // - API protegida
  await registerRoutes(app);

  /* ------------------------------------------------------------------------ */
  /*                        LOCAL DEV SERVER ONLY                              */
  /* ------------------------------------------------------------------------ */
  // En Vercel NO se debe llamar a listen()
  // Vercel inyecta su propio handler
  if (!process.env.VERCEL) {
    const PORT = Number(process.env.PORT) || 3000;
    const server = http.createServer(app);

    server.listen(PORT, () => {
      console.log(`🚀 KittyPau API escuchando en http://localhost:${PORT}`);
      initializeWebSocketServer(server);
    });
  }
}

bootstrap().catch((err) => {
  console.error("❌ Error iniciando el servidor:", err);
});

/* -------------------------------------------------------------------------- */
/*                            GLOBAL ERROR HANDLER                             */
/* -------------------------------------------------------------------------- */
app.use(
  (err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status ?? err.statusCode ?? 500;
    const message =
      err.message ?? "Internal Server Error";

    res.status(status).json({ error: message });
  }
);

export default app;
