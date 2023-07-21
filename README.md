# WhatsApp Chatbot with Twilio

This project is a WhatsApp chatbot built using Node.js, Express, TypeScript, MongoDB, and Twilio. The chatbot enables real-time interactions with users on WhatsApp, providing information, assistance, and services.

## Features

- **Real-time WhatsApp Interaction**: Users can send messages to the WhatsApp-enabled chatbot, and it responds instantly with appropriate answers based on user input.

- **User Data Storage**: The chatbot utilizes MongoDB to store user details and conversation history, allowing for personalized responses and context-aware interactions.

- **Dynamic Conversation Flow**: The chatbot employs a dynamic conversation flow to understand and respond to user intents, ensuring a more natural and engaging user experience.

- **Twilio Integration**: The Twilio API is used to facilitate communication between the chatbot and WhatsApp users, enabling seamless messaging over WhatsApp.

## Prerequisites

Before running the project, ensure you have the following installed:

- Node.js (v16 or higher)
- MongoDB
- Twilio account with the Account SID and Auth Token

## Setup

1. Clone the repository:

git clone [whatsapp-chatbot-with-twilio](https://github.com/princepatrickbondzie/whatsapp-chatbot-with-twilio.git)

2. Install dependencies:

cd whatsapp-chatbot-with-twilio
npm install

3. Configure Twilio:

   - Set your Twilio Account SID and Auth Token in the `config/config.ts` file.

4. Configure MongoDB:

   - Ensure MongoDB is running on your local machine or set up a remote MongoDB URL in `config/dbConnect.ts`.

5. Build the TypeScript code:

   - yarn build

6. Run the application:

   - yarn start

7. Expose the application to the internet:

   - Use tools like ngrok to expose your local server to the internet, allowing Twilio to access your endpoints.

## Usage

Once the application is running, the chatbot is accessible via WhatsApp using the Twilio WhatsApp-enabled number. Users can interact with the chatbot by sending messages to the number. The chatbot will respond accordingly based on the conversation flow and user inputs.

## Customization

Feel free to customize the chatbot's conversation flow, responses, and logic in the `src/controllers/bot.ts` file. You can add more intents, integrate natural language processing (NLP) libraries, or incorporate external APIs to extend the chatbot's functionality.

## Contributing

Contributions to the project are welcome! If you encounter issues, have suggestions, or want to add features, please submit a pull request or open an issue.

## License

This project is licensed under the [MIT License](LICENSE).
