import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSubmissionSchema, insertEmailSubscriptionSchema, insertVolunteerSignupSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      // Validate request body
      const contactData = insertContactSubmissionSchema.parse(req.body);
      
      // Save contact submission
      const submission = await storage.createContactSubmission(contactData);
      
      res.json({ 
        success: true, 
        message: "Contact submission received successfully",
        submissionId: submission.id 
      });
    } catch (error) {
      console.error("Contact form submission error:", error);
      
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Invalid form data", 
          errors: error.errors 
        });
      } else {
        res.status(500).json({ 
          success: false, 
          message: "Internal server error" 
        });
      }
    }
  });

  // Email subscription endpoint
  app.post("/api/email-subscription", async (req, res) => {
    try {
      const subscriptionData = insertEmailSubscriptionSchema.parse(req.body);
      const subscription = await storage.createEmailSubscription(subscriptionData);
      
      res.json({ 
        success: true, 
        message: "Email subscription successful",
        subscriptionId: subscription.id 
      });
    } catch (error) {
      console.error("Email subscription error:", error);
      
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Invalid form data", 
          errors: error.errors 
        });
      } else {
        res.status(500).json({ 
          success: false, 
          message: "Internal server error" 
        });
      }
    }
  });

  // Volunteer signup endpoint
  app.post("/api/volunteer-signup", async (req, res) => {
    try {
      const signupData = insertVolunteerSignupSchema.parse(req.body);
      const signup = await storage.createVolunteerSignup(signupData);
      
      res.json({ 
        success: true, 
        message: "Volunteer signup successful",
        signupId: signup.id 
      });
    } catch (error) {
      console.error("Volunteer signup error:", error);
      
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Invalid form data", 
          errors: error.errors 
        });
      } else {
        res.status(500).json({ 
          success: false, 
          message: "Internal server error" 
        });
      }
    }
  });

  // Admin endpoints for viewing data
  app.get("/api/admin/contacts", async (req, res) => {
    try {
      const contacts = await storage.getAllContactSubmissions();
      res.json(contacts);
    } catch (error) {
      console.error("Error fetching contacts:", error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  });

  app.get("/api/admin/subscribers", async (req, res) => {
    try {
      const subscribers = await storage.getAllEmailSubscriptions();
      res.json(subscribers);
    } catch (error) {
      console.error("Error fetching subscribers:", error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  });

  app.get("/api/admin/volunteers", async (req, res) => {
    try {
      const volunteers = await storage.getAllVolunteerSignups();
      res.json(volunteers);
    } catch (error) {
      console.error("Error fetching volunteers:", error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
