// Using Express types as a compatible fallback since @vercel/node is missing in package.json
import type { Request as VercelRequest, Response as VercelResponse } from 'express';
import { auth } from "../../server/auth/neonAuth";
import { toWebHeaders } from "../../server/api-utils";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    /* ---------------------------------------------------------------------- */
    /*                CONSTRUIR URL ABSOLUTA (OBLIGATORIA)                     */
    /* ---------------------------------------------------------------------- */

    const protoHeader = req.headers["x-forwarded-proto"] ?? "http";
    const protocol = Array.isArray(protoHeader) ? protoHeader[0] : protoHeader;

    const hostHeader = req.headers["host"] ?? "localhost:3000";
    const host = Array.isArray(hostHeader) ? hostHeader[0] : hostHeader;

    const url = req.url || "/api/auth"; // Fallback seguro
    const fullUrl = `${protocol}://${host}${url}`;

    /* ---------------------------------------------------------------------- */
    /*              ADAPTAR NODE REQUEST → FETCH REQUEST                       */
    /* ---------------------------------------------------------------------- */

    const webRequest = new Request(fullUrl, {
      method: req.method,
      headers: toWebHeaders(req.headers),
      body:
        req.method === "GET" || req.method === "HEAD"
          ? undefined
          : typeof req.body === 'string' ? req.body : JSON.stringify(req.body ?? {}),
    });

    /* ---------------------------------------------------------------------- */
    /*                         EJECUTAR BETTER AUTH                            */
    /* ---------------------------------------------------------------------- */

    const response = await auth.handler(webRequest);

    /* ---------------------------------------------------------------------- */
    /*                   COPIAR STATUS + HEADERS                               */
    /* ---------------------------------------------------------------------- */

    res.status(response.status);

    response.headers.forEach((value, key) => {
      if (key.toLowerCase() !== "set-cookie") {
        res.setHeader(key, value);
      }
    });

    /* ---------------------------------------------------------------------- */
    /*                          MANEJO DE COOKIES                              */
    /* ---------------------------------------------------------------------- */

    // @ts-ignore - getSetCookie puede no estar en los tipos de TS antiguos pero existe en runtime
    if (typeof response.headers.getSetCookie === 'function') {
      const cookies = response.headers.getSetCookie();
      if (cookies.length > 0) res.setHeader('Set-Cookie', cookies);
    } else {
      const cookie = response.headers.get('Set-Cookie');
      if (cookie) res.setHeader('Set-Cookie', cookie);
    }

    /* ---------------------------------------------------------------------- */
    /*                          ENVIAR BODY                                    */
    /* ---------------------------------------------------------------------- */

    const text = await response.text();
    res.send(text);
  } catch (err) {
    console.error("❌ Better Auth handler error:", err);
    res.status(500).json({ error: "Internal Auth Error" });
  }
}
