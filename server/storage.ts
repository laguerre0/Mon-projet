import { 
  users, 
  applications, 
  courses, 
  type User, 
  type InsertUser,
  type Application,
  type InsertApplication,
  type Course,
  type InsertCourse,
  ApplicationStatus
} from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";
import createMemoryStore from "memorystore";
import session from "express-session";

const MemoryStore = createMemoryStore(session);

export interface IStorage {
  // User management
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Application management
  getApplications(): Promise<Application[]>;
  getApplication(id: number): Promise<Application | undefined>;
  createApplication(application: InsertApplication): Promise<Application>;
  updateApplicationStatus(id: number, status: string): Promise<Application | undefined>;
  
  // Course management
  getCourses(): Promise<Course[]>;
  getCourse(id: number): Promise<Course | undefined>;
  createCourse(course: InsertCourse): Promise<Course>;
  
  sessionStore: any; // This fixes the SessionStore type issue
}

export class MemStorage implements IStorage {
  private usersMap: Map<number, User>;
  private applicationsMap: Map<number, Application>;
  private coursesMap: Map<number, Course>;
  sessionStore: any; // Using any to fix type issues
  currentUserId: number;
  currentApplicationId: number;
  currentCourseId: number;

  constructor() {
    this.usersMap = new Map();
    this.applicationsMap = new Map();
    this.coursesMap = new Map();
    this.sessionStore = new MemoryStore({
      checkPeriod: 86400000, // prune expired entries every 24h
    });
    this.currentUserId = 1;
    this.currentApplicationId = 1;
    this.currentCourseId = 1;
    
    // Seed with initial courses
    this.seedCourses();
  }

  private seedCourses() {
    const initialCourses = [
      {
        name: "Beginner English",
        description: "Build a strong foundation in English grammar, vocabulary, and basic conversation.",
        duration: "12 weeks",
        sessionsPerWeek: 2,
        level: "Beginner"
      },
      {
        name: "Intermediate English",
        description: "Enhance your English skills with advanced grammar and fluent conversation practice.",
        duration: "16 weeks",
        sessionsPerWeek: 2,
        level: "Intermediate"
      },
      {
        name: "Business English",
        description: "Master professional English for the workplace, including presentations and correspondence.",
        duration: "10 weeks",
        sessionsPerWeek: 3,
        level: "Advanced"
      }
    ];

    initialCourses.forEach(course => {
      this.createCourse(course as InsertCourse);
    });
    
    // Also seed admin and student users
    this.seedUsers();
  }
  
  private seedUsers() {
    // Add admin user
    const adminUser: User = {
      id: this.currentUserId++,
      username: "admin",
      password: "admin123", // Will be hashed during login
      role: "admin",
      email: "admin@woec.com",
      firstName: "Admin",
      lastName: "User",
      createdAt: new Date()
    };
    this.usersMap.set(adminUser.id, adminUser);
    
    // Add a student user
    const studentUser: User = {
      id: this.currentUserId++,
      username: "student",
      password: "student123", // Will be hashed during login
      role: "student",
      email: "student@woec.com",
      firstName: "Student",
      lastName: "User",
      createdAt: new Date()
    };
    this.usersMap.set(studentUser.id, studentUser);
  }

  // User management
  async getUser(id: number): Promise<User | undefined> {
    return this.usersMap.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.usersMap.values()).find(
      (user) => user.username === username,
    );
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.usersMap.values()).find(
      (user) => user.email === email,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const createdAt = new Date();
    // Ensure role is not undefined
    const role = insertUser.role || "student";
    const user: User = { ...insertUser, id, createdAt, role };
    this.usersMap.set(id, user);
    return user;
  }

  // Application management
  async getApplications(): Promise<Application[]> {
    return Array.from(this.applicationsMap.values());
  }

  async getApplication(id: number): Promise<Application | undefined> {
    return this.applicationsMap.get(id);
  }

  async createApplication(insertApplication: InsertApplication): Promise<Application> {
    const id = this.currentApplicationId++;
    const createdAt = new Date();
    const status = ApplicationStatus.PENDING;
    const application: Application = { ...insertApplication, id, status, createdAt };
    this.applicationsMap.set(id, application);
    return application;
  }

  async updateApplicationStatus(id: number, status: string): Promise<Application | undefined> {
    const application = await this.getApplication(id);
    if (!application) return undefined;

    const updatedApplication: Application = { ...application, status };
    this.applicationsMap.set(id, updatedApplication);
    return updatedApplication;
  }

  // Course management
  async getCourses(): Promise<Course[]> {
    return Array.from(this.coursesMap.values());
  }

  async getCourse(id: number): Promise<Course | undefined> {
    return this.coursesMap.get(id);
  }

  async createCourse(insertCourse: InsertCourse): Promise<Course> {
    const id = this.currentCourseId++;
    const course: Course = { ...insertCourse, id };
    this.coursesMap.set(id, course);
    return course;
  }
}

export class DatabaseStorage implements IStorage {
  sessionStore: any; // Using any to fix type issues
  
  constructor() {
    this.sessionStore = new MemoryStore({
      checkPeriod: 86400000, // prune expired entries every 24h
    });
  }

  // User management
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  // Application management
  async getApplications(): Promise<Application[]> {
    return await db.select().from(applications);
  }

  async getApplication(id: number): Promise<Application | undefined> {
    const [application] = await db.select().from(applications).where(eq(applications.id, id));
    return application;
  }

  async createApplication(insertApplication: InsertApplication): Promise<Application> {
    const [application] = await db
      .insert(applications)
      .values(insertApplication)
      .returning();
    return application;
  }

  async updateApplicationStatus(id: number, status: string): Promise<Application | undefined> {
    const [application] = await db
      .update(applications)
      .set({ status })
      .where(eq(applications.id, id))
      .returning();
    return application;
  }

  // Course management
  async getCourses(): Promise<Course[]> {
    return await db.select().from(courses);
  }

  async getCourse(id: number): Promise<Course | undefined> {
    const [course] = await db.select().from(courses).where(eq(courses.id, id));
    return course;
  }

  async createCourse(insertCourse: InsertCourse): Promise<Course> {
    const [course] = await db
      .insert(courses)
      .values(insertCourse)
      .returning();
    return course;
  }
}

// Force use of MemStorage to avoid database connection issues
export const storage = new MemStorage();
