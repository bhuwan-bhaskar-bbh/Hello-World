import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.get(api.greetings.get.path, async (req, res) => {
    const list = await storage.getGreetings();
    res.json(list);
  });

  await seedDatabase();

  return httpServer;
}

export async function seedDatabase() {
  const existing = await storage.getGreetings();
  if (existing.length === 0) {
    await storage.createGreeting({ message: "Hello, World!" });
  }
}
