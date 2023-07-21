// bot.ts
import { Request, Response } from "express";
import User, { IUser } from "../models/User";
import { sendErrorMessage, sendMessage } from "../utils/twilio";
import twilio = require("twilio");
import { Configs } from "../config/config";

const client = twilio(Configs.TWILIO_ACCOUNT_SID, Configs.TWILIO_AUTH_TOKEN);
const MessagingResponse = twilio.twiml.MessagingResponse;

async function bot(req: Request, res: Response) {
  const twiml = new MessagingResponse();
  const { ProfileName, WaId, Body, From } = req.body;
  const currentTime = new Date();
  let responseMessage = "";

  try {
    // Find the user in the database based on their phone number (from)
    let user: IUser | null = await User.findOne({ number: WaId });

    // If the user is new, save their details in the database
    if (!user) {
      user = await User.create({
        number: WaId,
        name: ProfileName,
        lastMessageTime: currentTime,
        conversations: [
          {
            initialResponse: "",
            userMessage: Body,
            nextResponse: `Hello, welcome to Express live chat. How can we assist you?`,
          },
        ],
      });

      responseMessage = user.conversations[0].nextResponse;
    } else {
      // Calculate the time elapsed since the user's last message
      const timeElapsed =
        currentTime.getTime() - user.lastMessageTime.getTime();

      // If the last message was sent more than 15 minutes ago, reset the conversation
      if (timeElapsed > 900000) {
        user.lastMessageTime = currentTime;
        user.conversations.push({
          initialResponse: "",
          userMessage: Body,
          nextResponse: `Hello, welcome back to Express live chat. How can we assist you?`,
        });

        responseMessage =
          user.conversations[user.conversations.length - 1].nextResponse;
      } else {
        const lastConversation =
          user.conversations[user.conversations.length - 1];

        // Based on the previous response, decide the next response
        if (
          lastConversation.nextResponse ===
            `Hello, welcome to Express live chat. How can we assist you?` ||
          lastConversation.nextResponse ===
            `Hello, welcome back to Express live chat. How can we assist you?` ||
          lastConversation.nextResponse === `Hello, How can we assist you?`
        ) {
          user.lastMessageTime = currentTime;
          user.conversations.push({
            initialResponse: lastConversation.nextResponse,
            userMessage: Body,
            nextResponse:
              "Thank you for the message. Kindly enter your phone number.",
          });

          responseMessage =
            user.conversations[user.conversations.length - 1].nextResponse;
        } else if (
          lastConversation.nextResponse ===
          "Thank you for the message. Kindly enter your phone number."
        ) {
          user.lastMessageTime = currentTime;
          user.conversations.push({
            initialResponse: lastConversation.nextResponse,
            userMessage: Body,
            nextResponse:
              "Thank you for your request. A customer agent will contact you shortly. You can also view more of our services on www.stiiestate.com",
          });

          responseMessage =
            user.conversations[user.conversations.length - 1].nextResponse;
        } else {
          user.lastMessageTime = currentTime;
          user.conversations.push({
            initialResponse: "",
            userMessage: Body,
            nextResponse: `Hello, How can we assist you?`,
          });

          responseMessage =
            user.conversations[user.conversations.length - 1].nextResponse;
        }
      }
    }

    // Save the updated conversation history in the database
    await user.save();
    twiml.message(responseMessage);
    res.writeHead(500, { "Content-Type": "text/xml" });
    res.end(twiml.toString());
  } catch (error) {
    console.error("Error processing the message:", error);
    twiml.message("Sorry something went wrong, please try again later.");
    res.writeHead(500, { "Content-Type": "text/xml" });
    res.end(twiml.toString());
  }
}

export { bot };
