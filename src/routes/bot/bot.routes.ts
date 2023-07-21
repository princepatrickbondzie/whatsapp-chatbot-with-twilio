import express from "express";
import validator from "../../middleware/validator";
import { bot } from "../../controllers/bot";
import schema from "./schema";
import webhookMiddleware from "../../middleware/extractor";

const router = express.Router();

router.post("/webhook", webhookMiddleware, validator(schema.payload), bot);

export default router;
