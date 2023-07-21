import express from "express";
import { bot } from "../../controllers/bot";

const router = express.Router();

router.post("/webhook", bot);

export default router;
