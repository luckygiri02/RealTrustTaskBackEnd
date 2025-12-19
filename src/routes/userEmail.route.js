import { Router } from "express";
import {
  getAllEmails,
  submitEmail,
} from "../controllers/userEmail.controller.js";

const router = Router();

router.route("/submit-email").post(submitEmail);

router.route("/all-userEmails").get(getAllEmails);

export default router;
