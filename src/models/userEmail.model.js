import mongoose, { Schema } from "mongoose";

const userEmailSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowecase: true,
      trim: true,
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "please enter a valid email Id",
      ],
    },
  },
  { timestamps: true }
);

export const UserEmail = mongoose.model("UserEmail", userEmailSchema);
