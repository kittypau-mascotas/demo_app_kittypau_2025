import { getUser } from "@/lib/api-utils";
import { db } from "@/lib/db";
import { telemetry, devices, deviceEvents } from "@/lib/schema";
import { eq, and, sql, desc } from "drizzle-orm";

export default async function handler(req: Request) {
  const url = new URL(req.url);
  
  // Health check endpoint
  if (url.pathname === '/api/health') {
    return new Response(JSON.stringify({ 
      status: 'ok', 
      message: 'Serverless API is working',
      timestamp: new Date().toISOString() 
    }), {
      headers: { 'Content-Type': 'application/json' },
      status: 200
    });
  }

  const user = await getUser(req);

  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }

  // ROUTING INTERNO
  if (url.pathname === "/api/devices") {
    // @ts-ignore
    const data = await db.select().from(devices).where(eq(devices.userId, user.id));
    return Response.json(data);
  }

  if (url.pathname === "/api/telemetry") {
    const deviceId = url.searchParams.get("deviceId");

    if (!deviceId) {
      return new Response("deviceId is required", { status: 400 });
    }

    const data = await db.select().from(telemetry)
      // @ts-ignore
      .where(eq(telemetry.deviceId, deviceId!));

    return Response.json(data);
  }
  
  if (url.pathname === "/api/events") {
    const deviceId = url.searchParams.get('deviceId');
    const startDate = url.searchParams.get('start_date');
    const endDate = url.searchParams.get('end_date');
    const limit = url.searchParams.get('limit');

    if (!deviceId || typeof deviceId !== 'string') {
      return new Response(JSON.stringify({ error: "Device ID is required" }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }

    // This is a mock, in reality you would verify ownership
    const hasOwnership = true; 
    if (!hasOwnership) {
        return new Response(JSON.stringify({ message: "Device not found or not owned by user" }), { status: 404, headers: { 'Content-Type': 'application/json' } });
    }

    const parsedLimit = limit ? parseInt(limit, 10) : 50;

    const events = await db.query.deviceEvents.findMany({
        where: and(
            eq(deviceEvents.deviceId, deviceId),
            startDate ? sql`${deviceEvents.ts} >= ${new Date(startDate)}` : undefined,
            endDate ? sql`${deviceEvents.ts} <= ${new Date(endDate)}` : undefined
        ),
        orderBy: [desc(deviceEvents.ts)],
        limit: parsedLimit
    });

    return new Response(JSON.stringify(events), {
        headers: { 'Content-Type': 'application/json' }
    });
  }

  return new Response("Not found", { status: 404 });
}
