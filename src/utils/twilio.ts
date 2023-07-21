import { Response } from "express";
import twilio = require("twilio");
import { Configs } from "../config/config";

const client = twilio(Configs.TWILIO_ACCOUNT_SID, Configs.TWILIO_AUTH_TOKEN);
const MessagingResponse = twilio.twiml.MessagingResponse;

const sendMessage =
  (message: string) => (res: Response<any, Record<string, any>>) => {
    const twiml = new MessagingResponse();
    twiml.message(message);
    res.writeHead(200, { "Content-Type": "text/xml" });
    res.end(twiml.toString());
  };

async function sendResponse(to: string, message: string) {
  try {
    const response = await client.messages.create({
      body: message,
      from: `whatsapp:+14155238886`,
      to: `whatsapp:${to}`,
    });

    console.log("Message sent successfully:", response.sid);
  } catch (error) {
    console.error("Error sending message:", error);
  }
}

const sendErrorMessage =
  (message: string) => (res: Response<any, Record<string, any>>) => {
    const twiml = new MessagingResponse();
    twiml.message(message);
    res.writeHead(500, { "Content-Type": "text/xml" });
    res.end(twiml.toString());
  };

export { sendMessage, sendErrorMessage, sendResponse };
