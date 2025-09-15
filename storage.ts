import { type User, type InsertUser, type ContactSubmission, type InsertContactSubmission, type EmailSubscription, type InsertEmailSubscription, type VolunteerSignup, type InsertVolunteerSignup, users, contactSubmissions, emailSubscriptions, volunteerSignups } from "@shared/schema";
import { randomUUID } from "crypto";
import { db } from "./db";
import { eq } from "drizzle-orm";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission>;
  createEmailSubscription(subscription: InsertEmailSubscription): Promise<EmailSubscription>;
  createVolunteerSignup(signup: InsertVolunteerSignup): Promise<VolunteerSignup>;
  getAllContactSubmissions(): Promise<ContactSubmission[]>;
  getAllEmailSubscriptions(): Promise<EmailSubscription[]>;
  getAllVolunteerSignups(): Promise<VolunteerSignup[]>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private contactSubmissions: Map<string, ContactSubmission>;
  private emailSubscriptions: Map<string, EmailSubscription>;
  private volunteerSignups: Map<string, VolunteerSignup>;

  constructor() {
    this.users = new Map();
    this.contactSubmissions = new Map();
    this.emailSubscriptions = new Map();
    this.volunteerSignups = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createContactSubmission(insertSubmission: InsertContactSubmission): Promise<ContactSubmission> {
    const id = randomUUID();
    const createdAt = new Date();
    const submission: ContactSubmission = { 
      ...insertSubmission, 
      id, 
      createdAt,
      interest: insertSubmission.interest ?? null
    };
    this.contactSubmissions.set(id, submission);
    return submission;
  }

  async createEmailSubscription(insertSubscription: InsertEmailSubscription): Promise<EmailSubscription> {
    const id = randomUUID();
    const createdAt = new Date();
    const subscription: EmailSubscription = {
      ...insertSubscription,
      id,
      createdAt,
      firstName: insertSubscription.firstName ?? null,
      interestedInAnalytics: insertSubscription.interestedInAnalytics ?? "false",
      interestedInRise: insertSubscription.interestedInRise ?? "false"
    };
    this.emailSubscriptions.set(id, subscription);
    return subscription;
  }

  async createVolunteerSignup(insertSignup: InsertVolunteerSignup): Promise<VolunteerSignup> {
    const id = randomUUID();
    const createdAt = new Date();
    const signup: VolunteerSignup = {
      ...insertSignup,
      id,
      createdAt,
      phoneNumber: insertSignup.phoneNumber ?? null
    };
    this.volunteerSignups.set(id, signup);
    return signup;
  }

  async getAllContactSubmissions(): Promise<ContactSubmission[]> {
    return Array.from(this.contactSubmissions.values()).sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  async getAllEmailSubscriptions(): Promise<EmailSubscription[]> {
    return Array.from(this.emailSubscriptions.values()).sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  async getAllVolunteerSignups(): Promise<VolunteerSignup[]> {
    return Array.from(this.volunteerSignups.values()).sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async createContactSubmission(insertSubmission: InsertContactSubmission): Promise<ContactSubmission> {
    const [submission] = await db
      .insert(contactSubmissions)
      .values(insertSubmission)
      .returning();
    return submission;
  }

  async createEmailSubscription(insertSubscription: InsertEmailSubscription): Promise<EmailSubscription> {
    const [subscription] = await db
      .insert(emailSubscriptions)
      .values(insertSubscription)
      .returning();
    return subscription;
  }

  async createVolunteerSignup(insertSignup: InsertVolunteerSignup): Promise<VolunteerSignup> {
    const [signup] = await db
      .insert(volunteerSignups)
      .values(insertSignup)
      .returning();
    return signup;
  }

  async getAllContactSubmissions(): Promise<ContactSubmission[]> {
    return await db.select().from(contactSubmissions).orderBy(contactSubmissions.createdAt);
  }

  async getAllEmailSubscriptions(): Promise<EmailSubscription[]> {
    return await db.select().from(emailSubscriptions).orderBy(emailSubscriptions.createdAt);
  }

  async getAllVolunteerSignups(): Promise<VolunteerSignup[]> {
    return await db.select().from(volunteerSignups).orderBy(volunteerSignups.createdAt);
  }
}

export const storage = new DatabaseStorage();
