import mongoose, { Schema, Document } from 'mongoose';

interface IConversation extends Document {
  participants: string[];
  lastMessage: string;
  lastMessageTime: Date;
}

const conversationSchema = new Schema<IConversation>({
  participants: [{ type: String, required: true }],
  lastMessage: String,
  lastMessageTime: { type: Date, default: Date.now },
});

export default mongoose.model<IConversation>('Conversation', conversationSchema);
