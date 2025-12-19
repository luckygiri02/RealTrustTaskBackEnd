import { Router } from "express";
import {
  adminProfile,
  loggoutAdmin,
  loginAdmin,
} from "../controllers/admin.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();

router.route("/login").post(loginAdmin);

router.route("/profile").post(verifyJWT, adminProfile);

router.route("/logout").get(verifyJWT, loggoutAdmin);

export default router;
