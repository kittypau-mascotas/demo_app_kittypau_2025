import type { VercelRequest, VercelResponse } from "@vercel/node";
import { db } from "@lib/db";
import { alertSettings } from "@shared/schema";
import { eq } from "drizzle-orm";
import cookie from "cookie";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const cookies = cookie.parse(req.headers.cookie || "");
  const sessionUserId = cookies.kittypau_session;
  if (!sessionUserId) return res.status(401).json({ error: "Unauthorized" });

  if (req.method === "POST") {
    const { temperatureMax, temperatureMin, notificationsEnabled } = req.body;
    await db.insert(alertSettings).values({
      userId: sessionUserId,
      temperatureMax,
      temperatureMin,
      notificationsEnabled
    }).onConflictDoUpdate({
      target: alertSettings.userId,
      set: { temperatureMax, temperatureMin, notificationsEnabled }
    });
    return res.status(200).json({ success: true });
  }

  if (req.method === "GET") {
    const settings = await db.select().from(alertSettings).where(eq(alertSettings.userId, sessionUserId));
    return res.status(200).json(settings[0] || {});
  }
  return res.status(405).json({ error: "Method not allowed" });
}