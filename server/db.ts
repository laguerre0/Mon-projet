import { drizzle } from "drizzle-orm/neon-serverless";
import { neon } from "@neondatabase/serverless";
import * as schema from "@shared/schema";

// Initialize Neon client with the DATABASE_URL from environment variable
const sql = neon(process.env.DATABASE_URL || "");

// Initialize drizzle with the client
export const db = drizzle(sql, { schema });
