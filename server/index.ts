import 'dotenv/config';

import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { initializeWebSocketServer } from "./websocket";
import * as http from 'http';// Import http module for server instance

const app = express();

declare module 'http' {
  interface IncomingMessage {
    rawBody: unknown
  }
}
app.use(express.json({
  verify: (req, _res, buf) => {
    req.rawBody = buf;
  }
}));
app.use(express.urlencoded({ extended: false }));

// ✅ HEALTH CHECK (Must be before auth and other routes)
// This endpoint does not depend on DB or Auth, ensuring we can debug deployment status.
app.get("/api/health", (_req, res) => {
  res.status(200).json({
    ok: true,
    env: process.env.NODE_ENV,
    time: new Date().toISOString(),
  });
});

// This middleware is for logging purposes and can be kept.
app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }
      // console.log(logLine); // Restoring log for debugging if needed
    }
  });

  next();
});

// The registerRoutes function sets up all the API routes.
// We'll await its completion before starting the server.
async function startServer() {
  await registerRoutes(app);

  // Only listen if not running in Vercel (Serverless)
  // Vercel sets process.env.VERCEL = '1'
  if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
    const PORT = process.env.PORT || 3000;
    // Create an HTTP server instance
    const httpServer = http.createServer(app);

    httpServer.listen(PORT, () => {
      console.log(`Servidor Express escuchando en el puerto ${PORT}`);
      // Initialize WebSocket server using the same HTTP server
      initializeWebSocketServer(httpServer);
    });
  }
}

startServer().catch(error => {
  console.error("Error al iniciar el servidor Express:", error);
});


app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  const status = err.status || err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  res.status(status).json({ message });
  // It's better not to re-throw the error in a production serverless environment
  // as it might cause the function to crash unexpectedly.
  // throw err;
});

export default app;
