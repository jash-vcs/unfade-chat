import { Request, Response } from 'express';
import Message from '../models/Message';

export const sendMessage = async (req: Request, res: Response) => {
  try {
    const { conversationId, senderId, message } = req.body;
    const newMessage = new Message({ conversationId, senderId, message });
    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ error: 'Error sending message' });
  }
};

export const getMessageHistoryByConversationId = async (req: Request, res: Response) => {
  try {
    const { conversationId } = req.params;
    const messages = await Message.find({ conversationId }).sort({ timestamp: 1 });

    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching messages' });
  }
};
