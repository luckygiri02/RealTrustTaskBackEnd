import { Router } from "express";
import { upload } from "../middleware/multer.middleware.js";
import {
  createClient,
  getAllClients,
} from "../controllers/client.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();

router.route("/all-clients").get(getAllClients);

router
  .route("/create-client")
  .post(upload.single("clientImage"), verifyJWT, createClient);

// router.route("/all-projects").get(getAllProjects)

export default router;
