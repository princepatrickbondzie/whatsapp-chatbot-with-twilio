import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  number: string;
  lastMessageTime: Date;
  conversations: {
    userMessage: string;
    initialResponse: string;
    nextResponse: string;
  }[];
}

const userSchema: Schema = new Schema({
  name: { type: String, required: true },
  number: { type: String, required: true, unique: true },
  lastMessageTime: { type: Date, required: true },
  conversations: [
    {
      userMessage: { type: String, required: true },
      initialResponse: { type: String },
      nextResponse: { type: String, required: true },
    },
  ],
});

export default mongoose.model<IUser>("User", userSchema);
