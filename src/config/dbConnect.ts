import mongoose from "mongoose";
import { Configs } from "./config";

mongoose
  .connect(Configs.MONGODB_URL as string)
  .then(() => console.log("Connected successfully"));
