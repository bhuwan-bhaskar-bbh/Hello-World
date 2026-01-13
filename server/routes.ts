import type { Express } from "express";
import crypto from "crypto";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";

const PASSWORD_KEY_LENGTH = 64;

function hashPassword(password: string) {
  const salt = crypto.randomBytes(16).toString("hex");
  const derivedKey = crypto.scryptSync(password, salt, PASSWORD_KEY_LENGTH).toString("hex");
  return { salt, hash: derivedKey };
}

function verifyPassword(password: string, salt: string, hash: string) {
  const derivedKey = crypto.scryptSync(password, salt, PASSWORD_KEY_LENGTH).toString("hex");
  return crypto.timingSafeEqual(Buffer.from(hash, "hex"), Buffer.from(derivedKey, "hex"));
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.get(api.greetings.get.path, async (req, res) => {
    const list = await storage.getGreetings();
    res.json(list);
  });

  app.post(api.auth.register.path, async (req, res) => {
    const { username, password } = req.body ?? {};
    if (!username || !password) {
      return res.status(400).json({ message: "Username and password are required." });
    }

    const existingUser = await storage.getUserByUsername(String(username));
    if (existingUser) {
      return res.status(409).json({ message: "Username already exists." });
    }

    const { salt, hash } = hashPassword(String(password));
    const user = await storage.createUser({
      username: String(username),
      passwordHash: hash,
      passwordSalt: salt,
    });

    return res.status(201).json({ id: user.id, username: user.username });
  });

  app.post(api.auth.login.path, async (req, res) => {
    const { username, password } = req.body ?? {};
    if (!username || !password) {
      return res.status(400).json({ message: "Username and password are required." });
    }

    const user = await storage.getUserByUsername(String(username));
    if (!user || !verifyPassword(String(password), user.passwordSalt, user.passwordHash)) {
      return res.status(401).json({ message: "Invalid username or password." });
    }

    return res.status(200).json({ id: user.id, username: user.username });
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
