import { betterAuth } from "better-auth";
import { neonAdapter } from "better-auth/adapters/neon";
import { users } from "../../shared/schema"; // Keep users if it's used for betterAuth's user management

if (!process.env.AUTH_SECRET) {
  throw new Error(
    "AUTH_SECRET is not set. Please set it in your .env file"
  );
}
if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL is not set. Please set it in your .env file"
  );
}

export const auth = betterAuth({
  database: neonAdapter({
    connectionString: process.env.DATABASE_URL,
    users: users, // Pass users table to the adapter
  }),
  secret: process.env.AUTH_SECRET,
});

