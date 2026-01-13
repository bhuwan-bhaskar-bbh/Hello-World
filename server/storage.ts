import { and, eq } from "drizzle-orm";
import { db } from "./db";
import {
  greetings,
  users,
  type Greeting,
  type InsertGreeting,
  type InsertUser,
  type User,
} from "@shared/schema";

export interface IStorage {
  getGreetings(): Promise<Greeting[]>;
  createGreeting(greeting: InsertGreeting): Promise<Greeting>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByAuthProvider(provider: string, providerId: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
}

export class DatabaseStorage implements IStorage {
  async getGreetings(): Promise<Greeting[]> {
    return await db.select().from(greetings);
  }

  async createGreeting(insertGreeting: InsertGreeting): Promise<Greeting> {
    const [greeting] = await db.insert(greetings).values(insertGreeting).returning();
    return greeting;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async getUserByAuthProvider(provider: string, providerId: string): Promise<User | undefined> {
    const [user] = await db
      .select()
      .from(users)
      .where(and(eq(users.authProvider, provider), eq(users.authProviderId, providerId)));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }
}

export const storage = new DatabaseStorage();
