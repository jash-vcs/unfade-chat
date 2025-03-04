import { Request, Response } from 'express';
import Message from '../models/Message';
import User from '../models/User';
import Conversation from '../models/Conversation';
import { emitMessageToUser } from '..';

export const sendMessage = async (req: Request, res: Response) => {
  try {
    const { conversationId, senderId, message } = req.body;
    const user = await User.findOne({ myServerUserId: senderId});
    if(!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }
    const conversation = await Conversation.findById(conversationId);
    if (!conversation) {
      res.status(404).json({ error: 'Conversation not found' });
      return;
    }
    const reciverId = conversation.participants.find((participant) => participant.toString() !== (""+user._id));
    const reciver = await User.findById(reciverId);
    if (!reciver) {
      res.status(404).json({ error: 'Reciver not found' });
      return;
    }
    const newMessage = new Message({ conversationId, senderId, message });
    const savedMessage = await newMessage.save();
    
    // Emit message to receiver using WebSocket
    emitMessageToUser(reciver.myServerUserId, {
      type: 'new_message',
      data: savedMessage.toJSON()
    });
    
    res.status(201).json(newMessage);
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ error: 'Error sending message' });
  }
};

export const getMessageHistoryByConversationId = async (req: Request, res: Response) => {
  try {
    const { conversationId } = req.params;
    const messages = await Message.find({ conversationId }).sort({ timestamp: 1 });
    res.json(messages);
  } catch (error) {
    console.error('Error getting message history:', error);
    res.status(500).json({ error: 'Error getting message history' });
  }
};
