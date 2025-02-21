import { Request, Response } from 'express';
import Conversation from '../models/Conversation';

export const createConversation = async (req: Request, res: Response) => {
  try {
    const { participants } = req.body;
    const conversation = new Conversation({ participants });
    await conversation.save();
    res.status(201).json(conversation);
  } catch (error) {
    res.status(500).json({ error: 'Error creating conversation' });
  }
};

export const getConversationsByUserId = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const conversations = await Conversation.find({
      participants: userId,
    }).sort({ lastMessageTime: -1 });

    res.status(200).json(conversations);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching conversations' });
  }
};
