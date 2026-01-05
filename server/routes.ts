import type { Express } from "express";
import { storage } from "./storage";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import session from "express-session";
import MemoryStore from "memorystore";

const MemoryStoreSession = MemoryStore(session);

export async function registerRoutes(app: Express): Promise<void> {
  // Configuración de sesiones
  app.use(session({
    secret: process.env.SESSION_SECRET || "your-secret-key", // ¡Cambiar en producción!
    resave: false,
    saveUninitialized: false,
    store: new MemoryStoreSession({
      checkPeriod: 86400000 // Prune expired entries every 24h
    }),
    cookie: { maxAge: 86400000 } // 24 horas
  }));

  // Inicializar Passport
  app.use(passport.initialize());
  app.use(passport.session());

  // Estrategia Local de Passport (para autenticación de usuarios)
  passport.use(new LocalStrategy(async (username, password, done) => {
    try {
      const user = await storage.getUserByUsername(username);
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      // TODO: Comparar la contraseña hasheada
      if (user.password !== password) { // DANGER: password en texto plano, esto debe ser hasheado
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }));

  // Serialización y deserialización del usuario para la sesión
  passport.serializeUser((user, done) => {
    done(null, (user as any).id); // Asumimos que el usuario tiene una propiedad 'id'
  });

  passport.deserializeUser(async (id: number, done) => {
    try {
      const user = await storage.getUser(id);
      done(null, user);
    } catch (err) {
      done(err);
    }
  });

  // Middleware para proteger rutas
  const isAuthenticated = (req: any, res: any, next: any) => {
    if (req.isAuthenticated()) {
      return next();
    }
    res.status(401).json({ message: "No autorizado" });
  };


  // --- Rutas de Autenticación ---
  app.post("/api/register", async (req, res) => {
    const { username, password, email, name, householdId, role } = req.body;
    // TODO: Hashear contraseña antes de guardar
    const newUser = await storage.createUser({ username, password, email, name, householdId, role });

    if (newUser) {
      res.status(201).json(newUser);
    } else {
      res.status(400).json({ message: "Error al registrar usuario" });
    }
  });

  app.post("/api/login", passport.authenticate('local', {
    successRedirect: '/api/profile', // Redirigir a una ruta protegida al éxito
    failureRedirect: '/api/login-fail' // Redirigir en caso de fallo
  }));

  app.get("/api/login-fail", (req, res) => {
    res.status(401).json({ message: "Credenciales inválidas" });
  });

  app.get("/api/logout", (req, res) => {
    req.logout((err) => {
      if (err) { return res.status(500).json({ message: "Error al cerrar sesión" }); }
      res.json({ message: "Sesión cerrada" });
    });
  });

  app.get("/api/profile", isAuthenticated, (req, res) => {
    res.json(req.user);
  });

  // --- Rutas de Entidades (Protegidas) ---

  // Households
  app.post("/api/households", async (req, res) => { // isAuthenticated remains disabled for initial household creation
    const newHousehold = await storage.createHousehold(req.body);
    if (newHousehold) {
      res.status(201).json(newHousehold);
    } else {
      res.status(400).json({ message: "Error al crear hogar" });
    }
  });

  app.get("/api/households/:id", isAuthenticated, async (req, res) => {
    const household = await storage.getHousehold(parseInt(req.params.id));
    if (household) {
      res.json(household);
    } else {
      res.status(404).json({ message: "Hogar no encontrado" });
    }
  });

  app.get("/api/households", isAuthenticated, async (req, res) => {
    const households = await storage.getHouseholds();
    res.json(households);
  });

  // Pets
  app.post("/api/pets", isAuthenticated, async (req, res) => {
    const newPet = await storage.createPet(req.body);
    if (newPet) {
      res.status(201).json(newPet);
    } else {
      res.status(400).json({ message: "Error al crear mascota" });
    }
  });

  app.get("/api/pets/:id", isAuthenticated, async (req, res) => {
    const pet = await storage.getPet(parseInt(req.params.id));
    if (pet) {
      res.json(pet);
    } else {
      res.status(404).json({ message: "Mascota no encontrada" });
    }
  });

  app.get("/api/pets", isAuthenticated, async (req, res) => {
    const householdId = req.query.householdId ? parseInt(req.query.householdId as string) : undefined;
    const pets = await storage.getPets(householdId);
    res.json(pets);
  });

  // Devices
  app.post("/api/devices", isAuthenticated, async (req, res) => {
    const newDevice = await storage.createDevice(req.body);
    if (newDevice) {
      res.status(201).json(newDevice);
    } else {
      res.status(400).json({ message: "Error al crear dispositivo" });
    }
  });

  app.get("/api/devices/:id", isAuthenticated, async (req, res) => {
    const device = await storage.getDevice(parseInt(req.params.id));
    if (device) {
      res.json(device);
    } else {
      res.status(404).json({ message: "Dispositivo no encontrado" });
    }
  });

  app.get("/api/devices", isAuthenticated, async (req, res) => {
    const householdId = req.query.householdId ? parseInt(req.query.householdId as string) : undefined;
    const devices = await storage.getDevices(householdId);
    res.json(devices);
  });

  // TODO: Implementar rutas para consumptionEvents, sensorReadings, deviceHealthReports
}