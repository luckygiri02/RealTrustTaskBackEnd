import { asyncHandler } from "../utils/asyncHandler.js";
import { Admin } from "../models/admin.model.js";
import bcrypt from "bcrypt";

const seedDefaultAdmin = async () => {
  const existingAdmin = await Admin.findOne({ email: process.env.ADMIN_EMAIL });
  if (!existingAdmin) {
    // const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
    const admin = await Admin.create({
      email: process.env.ADMIN_EMAIL,
      password: process.env.ADMIN_PASSWORD,
      role: "admin",
    });
    console.log(`Default admin created : ${admin}`);
  } else {
    console.log("Admin already exists");
  }
};

export default seedDefaultAdmin;
