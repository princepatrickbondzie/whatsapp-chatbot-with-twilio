import * as dotenv from "dotenv";
dotenv.config();

export const Configs = {
  PORT: process.env.PORT,
  MONGODB_URL: process.env.MONGODB_URL,
  TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
};
