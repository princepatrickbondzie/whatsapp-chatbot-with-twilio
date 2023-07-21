import * as dotenv from "dotenv";
dotenv.config();

export const Configs = {
  PORT: process.env.PORT,
  MONGODB_URL: process.env.MONGODB_URL,
  TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
  API_KEY: process.env["API_KEY"],
  BASE_URL: "https://api-football-v1.p.rapidapi",
  X_RAPIDAPI_HOST: "api-football-v1.p",
  RAPIDAPI_KEY: process.env["X_RAPIDAPI_KEY"],
};
