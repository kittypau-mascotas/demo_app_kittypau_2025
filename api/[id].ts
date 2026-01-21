import type { VercelRequest, VercelResponse } from "@vercel/node";
import { db } from "@lib/db";
import { pets } from "@shared/schema";
import { eq, and } from "drizzle-orm";
import cookie from "cookie";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const cookies = cookie.parse(req.headers.cookie || "");
  const sessionUserId = cookies.kittypau_session;
  if (!sessionUserId) return res.status(401).json({ error: "Unauthorized" });
  const userId = Number(sessionUserId);
  
  const { id } = req.query;
  const petId = Number(id);

  if (req.method === "GET") {
    const [pet] = await db.select().from(pets).where(and(eq(pets.id, petId), eq(pets.userId, userId)));
    if (!pet) return res.status(404).json({ error: "Pet not found" });
    return res.status(200).json(pet);
  }

  if (req.method === "PATCH" || req.method === "PUT") {
    const { name, species, breed, birthDate } = req.body;
    const [updatedPet] = await db.update(pets)
      .set({ name, species, breed, birthDate: birthDate ? new Date(birthDate) : undefined })
      .where(and(eq(pets.id, petId), eq(pets.userId, userId)))
      .returning();
    return res.status(200).json(updatedPet);
  }

  if (req.method === "DELETE") {
    await db.delete(pets).where(and(eq(pets.id, petId), eq(pets.userId, userId)));
    return res.status(200).json({ success: true });
  }
  return res.status(405).json({ error: "Method not allowed" });
}