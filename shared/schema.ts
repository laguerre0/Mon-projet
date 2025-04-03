import { pgTable, text, serial, integer, boolean, timestamp, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User table for authentication
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  role: text("role").notNull().default("student"),
  email: text("email").notNull(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Course table
export const courses = pgTable("courses", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  duration: text("duration").notNull(),
  sessionsPerWeek: integer("sessions_per_week").notNull(),
  level: text("level").notNull(),
});

// Applications table
export const applications = pgTable("applications", {
  id: serial("id").primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  country: text("country").notNull(),
  courseId: integer("course_id").notNull(),
  motivation: text("motivation").notNull(),
  status: text("status").notNull().default("pending"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Schemas for form validation
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  role: true,
  email: true,
  firstName: true,
  lastName: true,
});

export const insertCourseSchema = createInsertSchema(courses);

export const insertApplicationSchema = createInsertSchema(applications).omit({
  id: true,
  status: true,
  createdAt: true,
});

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertCourse = z.infer<typeof insertCourseSchema>;
export type Course = typeof courses.$inferSelect;

export type InsertApplication = z.infer<typeof insertApplicationSchema>;
export type Application = typeof applications.$inferSelect;

// Application statuses
export const ApplicationStatus = {
  PENDING: "pending",
  APPROVED: "approved",
  REJECTED: "rejected",
} as const;

// User roles
export const UserRole = {
  ADMIN: "admin",
  STUDENT: "student",
} as const;
