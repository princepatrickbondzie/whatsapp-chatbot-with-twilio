import express from "express";
import validator from "../../middleware/validator";
import { bot } from "../../controllers/bot";
import schema from "./schema";

const router = express.Router();

router.post("/webhook", validator(schema.payload), bot);

export default router;
