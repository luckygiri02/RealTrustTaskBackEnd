import { app } from "./app.js";
import dotenv from "dotenv";
import connectDB from "./db/index.js";
import seedDefaultAdmin from "./seed/seedDefaultAdmin.js";
import seedProjects from "./seed/seedProjects.js"; // Import seeder
import path from "path";
import express from "express";

dotenv.config();

const __dirname = path.resolve();

// Serve static files
app.use(express.static(path.join(__dirname, "/frontend/dist")));

// ✅ Keeping your working wildcard route exactly as it was
app.get("/*splat", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

connectDB()
  .then(async () => {
    // 1. Seed Admin
    await seedDefaultAdmin();
    
    // 2. Seed Projects (Adding this to fix your frontend error)
    await seedProjects(); 

    app.listen(process.env.PORT || 8000, () => {
      console.log(`🚀 Server running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("❌ MONGODB connection FAILED:", err);
  });