import { pgTable, text, serial, timestamp, boolean } from "drizzle-orm/pg-core";

// Tabela de usuários do Better-Auth (Fonte de verdade)
export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  emailVerified: boolean("email_verified").notNull(),
  image: text("image"),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});

// Tabela de usuários da Aplicação
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  authUserId: text("auth_user_id"), // Referência ao ID do Better-Auth
  email: text("email"),
  fullName: text("full_name"),
  createdAt: timestamp("created_at").defaultNow(),
});