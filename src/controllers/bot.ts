// bot.ts
import { Request, Response } from "express";
import User, { IUser } from "../models/User";
import { sendErrorMessage, sendMessage } from "../utils/twilio";

async function bot(req: Request, res: Response) {
  const { message, from, name } = req.body;
  const currentTime = new Date();
  let responseMessage = "";

  try {
    // Find the user in the database based on their phone number (from)
    let user: IUser | null = await User.findOne({ number: from });

    // If the user is new, save their details in the database
    if (!user) {
      user = await User.create({
        number: from,
        name: name,
        lastMessageTime: currentTime,
        conversations: [
          {
            initialResponse: "",
            userMessage: message,
            nextResponse: `Hello ${name}, welcome to Express live chat. How can we assist you?`,
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
          userMessage: message,
          nextResponse: `Hello ${name}, welcome back to Express live chat. How can we assist you?`,
        });

        responseMessage =
          user.conversations[user.conversations.length - 1].nextResponse;
      } else {
        const lastConversation =
          user.conversations[user.conversations.length - 1];

        // Based on the previous response, decide the next response
        if (
          lastConversation.nextResponse ===
            `Hello ${name}, welcome to Express live chat. How can we assist you?` ||
          lastConversation.nextResponse ===
            `Hello ${name}, welcome back to Express live chat. How can we assist you?` ||
          lastConversation.nextResponse ===
            `Hello ${name}, How can we assist you?`
        ) {
          user.lastMessageTime = currentTime;
          user.conversations.push({
            initialResponse: lastConversation.nextResponse,
            userMessage: message,
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
            userMessage: message,
            nextResponse:
              "Thank you for your request. A customer agent will contact you shortly. You can also view more of our services on www.stiiestate.com",
          });

          responseMessage =
            user.conversations[user.conversations.length - 1].nextResponse;
        } else {
          user.lastMessageTime = currentTime;
          user.conversations.push({
            initialResponse: "",
            userMessage: message,
            nextResponse: `Hello ${name}, How can we assist you?`,
          });

          responseMessage =
            user.conversations[user.conversations.length - 1].nextResponse;
        }
      }
    }

    // Save the updated conversation history in the database
    await user.save();
    sendMessage(responseMessage);
  } catch (error) {
    console.error("Error processing the message:", error);
    sendErrorMessage("Sorry, something went wrong. Please try again later.");
  }
}

export { bot };
