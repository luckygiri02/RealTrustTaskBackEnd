import mongoose, { Schema } from "mongoose";

const clientManagementSchema = new Schema(
  {
    clientImage: {
      type: String, // cloudinary url
      required: true,
    },
    clientDescription: {
      type: String,
      required: true,
    },
    clientName: {
      type: String,
      required: [true, "client name is required"],
      lowercase: true,
      trim: true,
      index: true,
    },
    clientDesignation: {
    type: String,
    required: true,
    trim: true
}
  },
  { timestamps: true }
);

export const ClientManagement = mongoose.model(
  "ClientManagement",
  clientManagementSchema
);
