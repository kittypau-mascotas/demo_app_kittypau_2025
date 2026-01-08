import type { Express } from "express";
import { storage } from "./storage";
import { requireNeonAuth } from "./middleware/requireNeonAuth"; // NEW
import { db } from "./db"; // NEW
import { users } from "../shared/schema"; // NEW
import { eq } from "drizzle-orm"; // NEW

export async function registerRoutes(app: Express): Promise<void> {

  // --- NEW Neon Auth Endpoints ---

  // Endpoint /api/me (fetch user profile)
  app.get("/api/me", requireNeonAuth, async (req, res) => {
    const neonUser = req.neonUser!; // Injected by requireNeonAuth middleware

    const existing = await db
      .select()
      .from(users)
      .where(eq(users.id, neonUser.id))
      .limit(1);

    let user = existing[0];

    // If user profile does not exist in our DB, create it (just-in-time provisioning)
    if (!user) {
      // Create a personal household for each new user implicitly.
      const newHouseholdName = `${neonUser.name || neonUser.email?.split('@')[0]}'s Household`; // Use optional chaining for email
      const insertedHousehold = await storage.createHousehold({ name: newHouseholdName });
      if (!insertedHousehold) {
        console.error(`Failed to create default household for user ${neonUser.id}`);
        return res.status(500).json({ error: "Failed to provision user household" });
      }

      const inserted = await db
        .insert(users)
        .values({
          id: neonUser.id,
          email: neonUser.email,
          name: neonUser.name || neonUser.email?.split('@')[0], // Use optional chaining for email
          role: "owner", // Default role for a user creating their own household
          householdId: insertedHousehold.id // Assign to the new default household
        })
        .returning();
      user = inserted[0];
    }

    res.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        householdId: user.householdId,
      },
    });
  });

  // Endpoint /api/logout (invalidate Neon Auth session)
  app.post("/api/logout", async (req, res) => {
    try {
      await fetch(`${process.env.NEON_AUTH_URL}/logout`, {
        method: "POST",
        headers: {
          cookie: req.headers.cookie ?? "",
        },
      });
    } catch (err) {
      console.error("Neon Auth logout error:", err);
    }
    res.clearCookie("neon_session");
    res.json({ success: true });
  });

  // --- Existing Entity Routes (Protected) ---

  // Households
  app.post("/api/households", requireNeonAuth, async (req, res) => { // Now protected
    const newHousehold = await storage.createHousehold(req.body);
    if (newHousehold) {
      res.status(201).json(newHousehold);
    } else {
      res.status(400).json({ message: "Error al crear hogar" });
    }
  });

  app.get("/api/households/:id", requireNeonAuth, async (req, res) => {
    const household = await storage.getHousehold(parseInt(req.params.id));
    if (household) {
      res.json(household);
    } else {
      res.status(404).json({ message: "Hogar no encontrado" });
    }
  });

  app.get("/api/households", requireNeonAuth, async (req, res) => {
    // For now, get all households. Later, filter by user's householdId
    const households = await storage.getHouseholds();
    res.json(households);
  });

  // Pets
  app.post("/api/pets", requireNeonAuth, async (req, res) => {
    const newPet = await storage.createPet(req.body);
    if (newPet) {
      res.status(201).json(newPet);
    } else {
      res.status(400).json({ message: "Error al crear mascota" });
    }
  });

  app.get("/api/pets/:id", requireNeonAuth, async (req, res) => {
    const pet = await storage.getPet(parseInt(req.params.id));
    if (pet) {
      res.json(pet);
    } else {
      res.status(404).json({ message: "Mascota no encontrada" });
    }
  });

  app.get("/api/pets", requireNeonAuth, async (req, res) => {
    const householdId = req.query.householdId ? parseInt(req.query.householdId as string) : undefined;
    const pets = await storage.getPets(householdId);
    res.json(pets);
  });

  // Devices
  app.post("/api/devices", requireNeonAuth, async (req, res) => {
    const newDevice = await storage.createDevice(req.body);
    if (newDevice) {
      res.status(201).json(newDevice);
    } else {
      res.status(400).json({ message: "Error al crear dispositivo" });
    }
  });

  app.get("/api/devices/:id", requireNeonAuth, async (req, res) => {
    const device = await storage.getDevice(parseInt(req.params.id));
    if (device) {
      res.json(device);
    } else {
      res.status(404).json({ message: "Dispositivo no encontrado" });
    }
  });

  app.get("/api/devices", requireNeonAuth, async (req, res) => {
    const householdId = req.query.householdId ? parseInt(req.query.householdId as string) : undefined;
    const devices = await storage.getDevices(householdId);
    res.json(devices);
  });

  // --- Telemetry Routes ---
  // Sensor Readings
  app.get("/api/sensor-readings", requireNeonAuth, async (req, res) => {
    const deviceId = parseInt(req.query.deviceId as string);
    if (isNaN(deviceId)) {
      return res.status(400).json({ message: "ID de dispositivo inválido" });
    }

    // TODO: Implement date range and limit filtering if needed later
    const readings = await storage.getSensorReadingsByDevice(deviceId);
    res.json(readings);
  });

  // Consumption Events
  app.get("/api/consumption-events", requireNeonAuth, async (req, res) => {
    const deviceId = parseInt(req.query.deviceId as string);
    if (isNaN(deviceId)) {
      return res.status(400).json({ message: "ID de dispositivo inválido" });
    }

    // TODO: Implement date range and limit filtering if needed later
    const events = await storage.getConsumptionEventsByDevice(deviceId);
    res.json(events);
  });}