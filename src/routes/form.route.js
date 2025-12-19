import { Router } from "express";
import {
  createContactForm,
  getAllFormData,
} from "../controllers/form.controller.js";

const router = Router();

router.route("/submit-form").post(createContactForm);
router.route("/get-all-forms").get(getAllFormData);

export default router;
