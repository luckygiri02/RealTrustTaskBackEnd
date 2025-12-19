import mongoose, { Schema } from "mongoose";

const projectManagementSchema = new Schema(
  {
    projectImage: {
      type: String, // cloudinary url
      required: true,
    },
    projectName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true,
    },
    projectDescription: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const ProjectManagement = mongoose.model(
  "ProjectManagement",
  projectManagementSchema
);
