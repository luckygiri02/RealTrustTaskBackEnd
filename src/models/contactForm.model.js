import mongoose, { Schema } from "mongoose";

const contactForm = new Schema(
  {
    fullName: {
      type: String,
      required: [true, "Admin name is required"],
      lowercase: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      lowecase: true,
      trim: true,
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "please enter a valid email Id",
      ],
    },
    mobileNumber: {
      type: String,
      required: [true, "Mobile Number is required"],
    },
    city: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const ContactForm = mongoose.model("ContactForm", contactForm);
