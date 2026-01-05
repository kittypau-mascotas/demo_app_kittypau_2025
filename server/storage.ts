import {
  type User,
  type InsertUser,
  users,
  insertUserSchema,
  type Household,
  type InsertHousehold,
  households,
  insertHouseholdSchema,
  type Pet,
  type InsertPet,
  pets,
  insertPetSchema,
  type Device,
  type InsertDevice,
  devices,
  insertDeviceSchema,
} from "../shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";
import { z } from "zod";

export interface IStorage {
  // Operaciones para Usuarios
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User | undefined>;

  // Operaciones para Households
  createHousehold(household: InsertHousehold): Promise<Household | undefined>;
  getHousehold(id: number): Promise<Household | undefined>;
  getHouseholds(): Promise<Household[]>;

  // Operaciones para Pets
  createPet(pet: InsertPet): Promise<Pet | undefined>;
  getPet(id: number): Promise<Pet | undefined>;
  getPets(householdId?: number): Promise<Pet[]>;

  // Operaciones para Devices
  createDevice(device: InsertDevice): Promise<Device | undefined>;
  getDevice(id: number): Promise<Device | undefined>;
  getDevices(householdId?: number): Promise<Device[]>;

  // TODO: Añadir operaciones para consumptionEvents, sensorReadings, deviceHealthReports, petsToDevices
}

export class DrizzleStorage implements IStorage {
  // --- Usuarios ---
  async getUser(id: number): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id)).limit(1);
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.username, username)).limit(1);
    return result[0];
  }

  async createUser(insertUser: InsertUser): Promise<User | undefined> {
    try {
      insertUserSchema.parse(insertUser);
      const result = await db.insert(users).values(insertUser).returning();
      return result[0];
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.error("Error de validación al crear usuario:", error.errors);
      } else {
        console.error("Error al crear usuario en la DB:", error);
      }
      return undefined;
    }
  }

  // --- Households ---
  async createHousehold(insertHousehold: InsertHousehold): Promise<Household | undefined> {
    try {
      insertHouseholdSchema.parse(insertHousehold);
      const result = await db.insert(households).values(insertHousehold).returning();
      return result[0];
    } catch (error) {
      console.error("Error al crear hogar en la DB:", error);
      return undefined;
    }
  }

  async getHousehold(id: number): Promise<Household | undefined> {
    const result = await db.select().from(households).where(eq(households.id, id)).limit(1);
    return result[0];
  }

  async getHouseholds(): Promise<Household[]> {
    return db.select().from(households);
  }

  // --- Pets ---
  async createPet(insertPet: InsertPet): Promise<Pet | undefined> {
    try {
      insertPetSchema.parse(insertPet);
      const result = await db.insert(pets).values(insertPet).returning();
      return result[0];
    } catch (error) {
      console.error("Error al crear mascota en la DB:", error);
      return undefined;
    }
  }

  async getPet(id: number): Promise<Pet | undefined> {
    const result = await db.select().from(pets).where(eq(pets.id, id)).limit(1);
    return result[0];
  }

  async getPets(householdId?: number): Promise<Pet[]> {
    if (householdId) {
      return db.select().from(pets).where(eq(pets.householdId, householdId));
    }
    return db.select().from(pets);
  }

  // --- Devices ---
  async createDevice(insertDevice: InsertDevice): Promise<Device | undefined> {
    try {
      insertDeviceSchema.parse(insertDevice);
      const result = await db.insert(devices).values(insertDevice).returning();
      return result[0];
    } catch (error) {
      console.error("Error al crear dispositivo en la DB:", error);
      return undefined;
    }
  }

  async getDevice(id: number): Promise<Device | undefined> {
    const result = await db.select().from(devices).where(eq(devices.id, id)).limit(1);
    return result[0];
  }

  async getDevices(householdId?: number): Promise<Device[]> {
    if (householdId) {
      return db.select().from(devices).where(eq(devices.householdId, householdId));
    }
    return db.select().from(devices);
  }
}

export const storage = new DrizzleStorage();
