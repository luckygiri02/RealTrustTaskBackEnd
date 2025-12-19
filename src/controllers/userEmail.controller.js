import { asyncHandler } from "../utils/asyncHandler.js";
import { UserEmail } from "../models/userEmail.model.js"; // Adjust path as needed
import { ApiResponse } from "../utils/ApiResponse.js";

const submitEmail = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    res.status(400);
    throw new Error("Email is required");
  }

  // Check if email already exists
  const existing = await UserEmail.findOne({ email });

  if (existing) {
    res.status(409);
    throw new Error("Email already exists");
  }

  const newEmail = await UserEmail.create({ email });

  res.status(201).json({
    message: "Email submitted successfully",
    email: newEmail,
  });
});

const getAllEmails = asyncHandler(async (req, res) => {
  const emails = await UserEmail.find().sort({ createdAt: -1 });
  res
    .status(200)
    .json(
      new ApiResponse(200, emails, "All users emails fetched successfully")
    );
});

export { getAllEmails, submitEmail };
