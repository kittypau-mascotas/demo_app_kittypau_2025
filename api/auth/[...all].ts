import { auth } from "./neonAuth";
import { toWebHeaders } from "../../api-utils";

export default async function handler(req: any, res: any) {
  if (!auth) {
    console.error("❌ Auth system not initialized");
    return res.status(500).json({
      error: "Auth system not initialized. Check environment variables.",
    });
  }

  try {
    /* ------------------------------------------------------------ */
    /*                    BUILD FULL URL                            */
    /* ------------------------------------------------------------ */

    const protocolHeader = req.headers["x-forwarded-proto"] || "https";
    const protocol = Array.isArray(protocolHeader)
      ? protocolHeader[0]
      : protocolHeader;

    const hostHeader = req.headers.host || "localhost";
    const host = Array.isArray(hostHeader) ? hostHeader[0] : hostHeader;

    const url = `${protocol}://${host}${req.url}`;

    /* ------------------------------------------------------------ */
    /*                    NODE → WEB REQUEST                        */
    /* ------------------------------------------------------------ */

    const webRequest = new Request(url, {
      method: req.method,
      headers: toWebHeaders(req.headers),
      body:
        req.method === "GET" || req.method === "HEAD"
          ? undefined
          : JSON.stringify(req.body),
    });

    const response = await auth.handler(webRequest);

    /* ------------------------------------------------------------ */
    /*                    STATUS + HEADERS                          */
    /* ------------------------------------------------------------ */

    res.status(response.status);

    response.headers.forEach((value: string, key: string) => {
      if (key.toLowerCase() !== "set-cookie") {
        res.setHeader(key, value);
      }
    });

    /* ------------------------------------------------------------ */
    /*                    COOKIES                                   */
    /* ------------------------------------------------------------ */

    const anyHeaders = response.headers as any;

    if (typeof anyHeaders.getSetCookie === "function") {
      const cookies: string[] = anyHeaders.getSetCookie();
      if (cookies.length > 0) {
        res.setHeader("Set-Cookie", cookies);
      }
    } else {
      const cookie = response.headers.get("set-cookie");
      if (cookie) {
        res.setHeader("Set-Cookie", cookie);
      }
    }

    /* ------------------------------------------------------------ */
    /*                    BODY                                      */
    /* ------------------------------------------------------------ */

    const text = await response.text();
    res.send(text);
  } catch (err) {
    console.error("❌ Better Auth handler error:", err);
    res.status(500).json({ error: "Internal auth error" });
  }
}
