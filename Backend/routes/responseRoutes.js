import express from "express";
import { submitResponse, getResponsesByFormId } from "../controller/responseController.js";

const router = express.Router();

router.route("/")
    .post(submitResponse);

router.route("/:formId")
    .get(getResponsesByFormId);

export default router;
