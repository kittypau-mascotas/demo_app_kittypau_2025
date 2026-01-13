// server/types/express.d.ts
import { NeonUser } from "@neondatabase/serverless";
import { users, devices } from "../shared/schema"; // Import the users and devices schemas for type inference
import { InferSelectModel } from "drizzle-orm";

// Extend the Express Request interface
declare global {
  namespace Express {
    interface Request {
      neonUser: NeonUser; // The user object from Neon Auth middleware
      appUserId?: InferSelectModel<typeof users>["id"]; // The ID of the user in our application database
      deviceRecord?: InferSelectModel<typeof devices>; // Assuming `devices` is also a drizzle schema
    }
  }
}