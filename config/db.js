import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

// Connection 1: website_forms
export const formsDB = mongoose.createConnection(MONGO_URI, { 
  dbName: 'website_forms' 
});

// Connection 2: dynamic-website-blogs
export const blogDB = mongoose.createConnection(MONGO_URI, { 
  dbName: 'dynamic-website-blogs' 
});

formsDB.on("connected", () => console.log("✅ Connected: website_forms"));
blogDB.on("connected", () => console.log("✅ Connected: dynamic-website-blogs"));