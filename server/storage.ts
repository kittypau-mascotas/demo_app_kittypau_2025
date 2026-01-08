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






export class DrizzleStorage implements IStorage {
  // --- Usuarios ---
  async getUser(id: string): Promise<User | undefined> { // Cambiado a string
    const result = await db.select().from(users).where(eq(users.id, id)).limit(1);
    return result[0];
  }

  async createUser(insertUser: InsertUser): Promise<User | undefined> {
    try {
      const result = await db.insert(users).values(insertUser).returning();
      return result[0];
    } catch (error) {
      console.error("Error al crear usuario en la DB:", error);
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

  // --- Consumption Events ---
  async createConsumptionEvent(insertEvent: InsertConsumptionEvent): Promise<ConsumptionEvent | undefined> {
    try {
      insertConsumptionEventSchema.parse(insertEvent);
      const result = await db.insert(consumptionEvents).values(insertEvent).returning();
      return result[0];
    } catch (error) {
      console.error("Error al crear evento de consumo en la DB:", error);
      return undefined;
    }
  }

  async getConsumptionEvent(id: number): Promise<ConsumptionEvent | undefined> {
    const result = await db.select().from(consumptionEvents).where(eq(consumptionEvents.id, id)).limit(1);
    return result[0];
  }

  async getConsumptionEventsByDevice(deviceId: number): Promise<ConsumptionEvent[]> {
    return db.select().from(consumptionEvents).where(eq(consumptionEvents.deviceId, deviceId));
  }

  // --- Sensor Readings ---
  async createSensorReading(insertReading: InsertSensorReading): Promise<SensorReading | undefined> {
    try {
      insertSensorReadingSchema.parse(insertReading);
      const result = await db.insert(sensorReadings).values(insertReading).returning();
      return result[0];
    } catch (error) {
      console.error("Error al crear lectura de sensor en la DB:", error);
      return undefined;
    }
  }

  async getSensorReading(id: number): Promise<SensorReading | undefined> {
    const result = await db.select().from(sensorReadings).where(eq(sensorReadings.id, id)).limit(1);
    return result[0];
  }

  async getSensorReadingsByDevice(deviceId: number): Promise<SensorReading[]> {
    return db.select().from(sensorReadings).where(eq(sensorReadings.deviceId, deviceId));
  }

  // --- Device Health Reports ---
  async createDeviceHealthReport(insertReport: InsertDeviceHealthReport): Promise<DeviceHealthReport | undefined> {
    try {
      insertDeviceHealthReportSchema.parse(insertReport);
      const result = await db.insert(deviceHealthReports).values(insertReport).returning();
      return result[0];
    } catch (error) {
      console.error("Error al crear reporte de salud del dispositivo en la DB:", error);
      return undefined;
    }
  }

  async getDeviceHealthReport(id: number): Promise<DeviceHealthReport | undefined> {
    const result = await db.select().from(deviceHealthReports).where(eq(deviceHealthReports.id, id)).limit(1);
    return result[0];
  }

  async getDeviceHealthReportsByDevice(deviceId: number): Promise<DeviceHealthReport[]> {
    return db.select().from(deviceHealthReports).where(eq(deviceHealthReports.deviceId, deviceId));
  }

  // --- Pets To Devices ---
  async addPetToDevice(petId: number, deviceId: number): Promise<void> {
    try {
      await db.insert(petsToDevices).values({ petId, deviceId });
    } catch (error) {
      console.error("Error al añadir relación mascota-dispositivo en la DB:", error);
    }
  }

  async removePetFromDevice(petId: number, deviceId: number): Promise<void> {
    try {
      await db.delete(petsToDevices).where(
        and(eq(petsToDevices.petId, petId), eq(petsToDevices.deviceId, deviceId))
      );
    } catch (error) {
      console.error("Error al eliminar relación mascota-dispositivo en la DB:", error);
    }
  }

  async getDevicesForPet(petId: number): Promise<Device[]> {
    const result = await db
      .select({ device: devices })
      .from(petsToDevices)
      .innerJoin(devices, eq(petsToDevices.deviceId, devices.id))
      .where(eq(petsToDevices.petId, petId));
    return result.map(row => row.device);
  }

  async getPetsForDevice(deviceId: number): Promise<Pet[]> {
    const result = await db
      .select({ pet: pets })
      .from(petsToDevices)
      .innerJoin(pets, eq(petsToDevices.petId, pets.id))
      .where(eq(petsToDevices.deviceId, deviceId));
    return result.map(row => row.pet);
  }
}

export const storage = new DrizzleStorage();
