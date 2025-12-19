import { ProjectManagement } from "../models/projectManagement.model.js";

const seedProjects = async () => {
  try {
    // Check if projects already exist
    const count = await ProjectManagement.countDocuments();

    if (count === 0) {
      console.log("Empty database found. Seeding sample projects...");
      
      await ProjectManagement.create([
        {
          projectName: "Modern Luxury Villa",
          projectDescription: "A beautiful 4-bedroom villa with a private pool and smart home features. Located in the heart of the suburbs with great connectivity.",
          projectImage: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=60"
        },
        {
          projectName: "Skyline Apartments",
          projectDescription: "Premium high-rise apartments offering a panoramic view of the city skyline. Includes gym, spa, and 24/7 security.",
          projectImage: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=60"
        },
        {
          projectName: "Green Valley Township",
          projectDescription: "Sustainable living at its best. Eco-friendly materials and solar power throughout the entire residential complex.",
          projectImage: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=60"
        }
      ]);

      console.log("✅ Sample projects seeded successfully!");
    } else {
      console.log("ℹ️ Projects already exist in DB. Skipping seeding.");
    }
  } catch (error) {
    console.error("❌ Error while seeding projects:", error);
  }
};

export default seedProjects;