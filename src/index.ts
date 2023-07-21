import express, { Request, Response } from "express";
import "./config/dbConnect";
import cors from "cors";
import { Configs } from "./config/config";
import botRoutes from "./routes/bot/bot.routes";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.status(200).json("Welcome To WhatsApp Chatbot");
});

//routes
app.use("/api/chats", botRoutes);

app.listen(Configs.PORT, () => {
  console.log(`Server is running on port: ${Configs.PORT}`);
});
