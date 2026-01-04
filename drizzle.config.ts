import { defineConfig } from "drizzle-kit";

// Only check for DATABASE_URL when running drizzle-kit push
if (process.argv.includes("push") && !process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL, ensure the database is provisioned");
}

export default defineConfig({
  out: "./migrations",
  schema: "./shared/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
