import { pgTable, text, serial, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const greetings = pgTable("greetings", {
  id: serial("id").primaryKey(),
  message: text("message").notNull(),
});

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  passwordSalt: text("password_salt").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertGreetingSchema = createInsertSchema(greetings).pick({
  message: true,
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  passwordHash: true,
  passwordSalt: true,
});

export type Greeting = typeof greetings.$inferSelect;
export type InsertGreeting = z.infer<typeof insertGreetingSchema>;
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
