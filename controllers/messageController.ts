import { Request, Response } from 'express';
import Message from '../models/Message';
import User from '../models/User';
import Conversation from '../models/Conversation';

export const sendMessage = async (req: Request, res: Response) => {
  try {
    const { conversationId, senderId, message } = req.body;
    const user = await User
          .findOne({ myServerUserId: senderId});
          if(!user) {
            res.status(404).json({ error: 'User not found' });
            return;
          }
    const newMessage = new Message({ conversationId, senderId: user._id, message });
    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ error: 'Error sending message' });
  }
};

export const getMessageHistoryByConversationId = async (req: Request, res: Response) => {
  try {
    const { conversationId } = req.params;
    const conversation = await Conversation.findById(conversationId).populate('participants').exec();
    const messages = await Message.find({ conversationId }).populate('senderId').sort({ timestamp: 1 }).exec();

    res.status(200).json({messages, conversation});
  } catch (error) {
    res.status(500).json({ error: 'Error fetching messages' });
  }
};
