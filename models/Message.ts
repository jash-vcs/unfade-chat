import mongoose, { Schema, Document } from 'mongoose';

interface IMessage extends Document {
  conversationId: string;
  senderId: string;
  message: string;
  timestamp: Date;
}

const messageSchema = new Schema<IMessage>({
  conversationId: { type: String, required: true, ref: 'Conversation' },
  senderId: { type: String, required: true, ref: 'User' },
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

export default mongoose.model<IMessage>('Message', messageSchema);
