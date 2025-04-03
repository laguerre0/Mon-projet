import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, generateUsername, generatePassword, hashPassword } from "./auth";
import { emailService } from "./email";
import { ApplicationStatus, UserRole, insertApplicationSchema } from "@shared/schema";
import { z } from "zod";
import { ZodError } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Setup authentication routes
  setupAuth(app);

  // Middleware to check if user is admin
  const isAdmin = (req: Request, res: Response, next: Function) => {
    if (!req.isAuthenticated() || req.user?.role !== UserRole.ADMIN) {
      return res.status(403).json({ message: "Access denied" });
    }
    next();
  };

  // API routes
  // Courses routes
  app.get("/api/courses", async (req, res) => {
    try {
      // Use the hardcoded courses for now to ensure the API works
      const staticCourses = [
        {
          id: 1,
          name: "Beginner English",
          description: "Build a strong foundation in English grammar, vocabulary, and basic conversation.",
          duration: "12 weeks",
          sessionsPerWeek: 2,
          level: "Beginner"
        },
        {
          id: 2,
          name: "Intermediate English",
          description: "Enhance your English skills with advanced grammar and fluent conversation practice.",
          duration: "16 weeks",
          sessionsPerWeek: 2,
          level: "Intermediate"
        },
        {
          id: 3,
          name: "Business English",
          description: "Master professional English for the workplace, including presentations and correspondence.",
          duration: "10 weeks",
          sessionsPerWeek: 3,
          level: "Advanced"
        }
      ];
      res.json(staticCourses);
    } catch (error) {
      console.error("Error fetching courses:", error);
      res.status(500).json({ message: "Failed to fetch courses" });
    }
  });

  app.get("/api/courses/:id", async (req, res) => {
    try {
      const courseId = parseInt(req.params.id);
      const course = await storage.getCourse(courseId);
      
      if (!course) {
        return res.status(404).json({ message: "Course not found" });
      }
      
      res.json(course);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch course" });
    }
  });

  // Application routes
  app.post("/api/applications", async (req, res) => {
    try {
      const validatedData = insertApplicationSchema.parse(req.body);
      const application = await storage.createApplication(validatedData);
      res.status(201).json(application);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ message: "Invalid application data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to create application" });
      }
    }
  });

  // Admin routes - require admin authentication
  app.get("/api/admin/applications", isAdmin, async (req, res) => {
    try {
      const applications = await storage.getApplications();
      res.json(applications);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch applications" });
    }
  });

  app.put("/api/admin/applications/:id/status", isAdmin, async (req, res) => {
    try {
      const applicationId = parseInt(req.params.id);
      const { status, reason } = req.body;
      
      if (!status || !Object.values(ApplicationStatus).includes(status)) {
        return res.status(400).json({ message: "Invalid status" });
      }
      
      const application = await storage.getApplication(applicationId);
      if (!application) {
        return res.status(404).json({ message: "Application not found" });
      }
      
      // Update application status
      const updatedApplication = await storage.updateApplicationStatus(applicationId, status);
      
      // Handle approval process - create user account and send email
      if (status === ApplicationStatus.APPROVED) {
        // Generate username and password
        const username = generateUsername(application.firstName, application.lastName);
        const password = generatePassword();
        
        // Create user account
        await storage.createUser({
          username,
          password: await hashPassword(password),
          role: UserRole.STUDENT,
          email: application.email,
          firstName: application.firstName,
          lastName: application.lastName
        });
        
        // Send welcome email with credentials
        await emailService.sendWelcomeEmail(
          application.email,
          application.firstName,
          username,
          password
        );
      }
      
      // Send rejection email
      if (status === ApplicationStatus.REJECTED) {
        await emailService.sendRejectionEmail(
          application.email,
          application.firstName,
          reason || undefined
        );
      }
      
      res.json(updatedApplication);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to update application status" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
