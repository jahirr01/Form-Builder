import express from "express";
import upload from "../middleware/uploadMiddleware.js";
import { createForm, getForms, getFormById } from "../controller/formController.js";

const router = express.Router();

router.route("/")
    .get(getForms)
    .post(upload.single("image"), createForm);

router.route("/:id")
    .get(getFormById);

export default router;
