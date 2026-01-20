import { getUser } from "@/lib/api-utils";
import { db } from "@/lib/db";
import { telemetry, devices, deviceEvents, alertSettings, users, user as userSchema } from "@/lib/schema";
import { eq, and, sql, desc, gte, lte } from "drizzle-orm";

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

  // GESTIÓN DE USUARIO
  if (url.pathname === "/api/user") {
    if (req.method === "DELETE") {
      // 1. Eliminar de la tabla de aplicación 'users' (esto debería borrar en cascada mascotas/dispositivos si está configurado en DB)
      // @ts-ignore
      await db.delete(users).where(eq(users.authUserId, user.id));

      // 2. Eliminar de la tabla de autenticación 'user'
      // @ts-ignore
      await db.delete(userSchema).where(eq(userSchema.id, user.id));

      return new Response(JSON.stringify({ success: true }), {
        headers: { "Content-Type": "application/json" }
      });
    }
  }

  // ROUTING INTERNO
  if (url.pathname === "/api/devices") {
    if (req.method === "DELETE") {
      const deviceId = url.searchParams.get("id");

      if (!deviceId) {
        return new Response("Device ID is required", { status: 400 });
      }

      // Verificar propiedad
      const device = await db.select().from(devices)
        // @ts-ignore
        .where(and(eq(devices.id, deviceId), eq(devices.userId, user.id)))
        .limit(1);

      if (device.length === 0) {
        return new Response("Device not found or unauthorized", { status: 404 });
      }

      // Eliminar datos asociados
      // @ts-ignore
      await db.delete(telemetry).where(eq(telemetry.deviceId, deviceId));
      // @ts-ignore
      await db.delete(deviceEvents).where(eq(deviceEvents.deviceId, deviceId));
      
      // Eliminar dispositivo
      // @ts-ignore
      await db.delete(devices).where(eq(devices.id, deviceId));

      return new Response(JSON.stringify({ success: true }), {
        headers: { "Content-Type": "application/json" }
      });
    }

    // @ts-ignore
    const data = await db.select().from(devices).where(eq(devices.userId, user.id));
    return Response.json(data);
  }

  if (url.pathname === "/api/telemetry") {
    const deviceId = url.searchParams.get("deviceId");
    const limitParam = url.searchParams.get("limit");
    const pageParam = url.searchParams.get("page");
    const pageSizeParam = url.searchParams.get("pageSize");
    const startDate = url.searchParams.get("start_date");
    const endDate = url.searchParams.get("end_date");
    const format = url.searchParams.get("format");

    if (!deviceId) {
      return new Response("deviceId is required", { status: 400 });
    }

    const filters = [eq(telemetry.deviceId, deviceId!)];

    if (startDate) filters.push(gte(telemetry.createdAt, new Date(startDate)));
    if (endDate) filters.push(lte(telemetry.createdAt, new Date(endDate)));

    // EXPORTAR CSV
    if (format === "csv") {
      const data = await db.select().from(telemetry)
        // @ts-ignore
        .where(and(...filters))
        .orderBy(desc(telemetry.createdAt))
        .limit(5000); // Límite de seguridad para evitar timeouts en Vercel

      if (data.length === 0) {
        return new Response("No data", { status: 404 });
      }

      const headers = Object.keys(data[0]).join(",");
      const csv = [
        headers,
        ...data.map(row => Object.values(row).map(v => 
          v instanceof Date ? v.toISOString() : String(v).includes(',') ? `"${v}"` : v
        ).join(","))
      ].join("\n");

      return new Response(csv, {
        headers: {
          "Content-Type": "text/csv",
          "Content-Disposition": `attachment; filename="telemetry-${deviceId}.csv"`,
        },
      });
    }

    // MODO PAGINADO (Para Tablas)
    if (pageParam !== null) {
      const page = parseInt(pageParam, 10);
      const pageSize = pageSizeParam ? parseInt(pageSizeParam, 10) : 10;
      const offset = page * pageSize;

      const [data, countResult] = await Promise.all([
        db.select().from(telemetry)
          // @ts-ignore
          .where(and(...filters))
          .orderBy(desc(telemetry.createdAt))
          .limit(pageSize)
          .offset(offset),
        db.select({ count: sql<number>`count(*)` }).from(telemetry)
          // @ts-ignore
          .where(and(...filters))
      ]);

      return Response.json({
        data,
        meta: {
          page,
          pageSize,
          total: Number(countResult[0]?.count || 0),
        }
      });
    }

    // MODO SIMPLE (Para Gráficas - Legacy)
    const limit = limitParam ? parseInt(limitParam, 10) : 100;
    const data = await db.select().from(telemetry)
      // @ts-ignore
      .where(and(...filters))
      .orderBy(desc(telemetry.createdAt))
      .limit(limit);

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

  // REGLAS DE ALERTAS (Configuración)
  if (url.pathname === "/api/alerts/rules") {
    if (req.method === "POST") {
      const { temperatureMax, temperatureMin, notificationsEnabled } = await req.json();

      // Upsert: Insertar o Actualizar si ya existe
      // @ts-ignore
      await db.insert(alertSettings).values({
        userId: user.id,
        temperatureMax,
        temperatureMin,
        notificationsEnabled
      }).onConflictDoUpdate({
        // @ts-ignore
        target: alertSettings.userId,
        set: { 
          temperatureMax, 
          temperatureMin, 
          notificationsEnabled 
        }
      });

      return new Response(JSON.stringify({ success: true }), {
        headers: { "Content-Type": "application/json" }
      });
    }

    if (req.method === "GET") {
      // @ts-ignore
      const settings = await db.select().from(alertSettings).where(eq(alertSettings.userId, user.id));
      return Response.json(settings[0] || {});
    }
  }

  return new Response("Not found", { status: 404 });
}
