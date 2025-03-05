import { Request, Response } from 'express';
import Conversation from '../models/Conversation';
import User from '../models/User';

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
    const user = await User
      .findOne({ myServerUserId: userId});
      if(!user) {
        res.status(404).json({ error: 'User not found' });
        return;
      }
    const populatedConversations = await Conversation.find({
      participants:userId,
    }).populate('participants').sort({ createdAt: -1 })
    const conversationsWithRecivers = populatedConversations.map((conversation) => {
      const newConversation:any = conversation.toObject();
      newConversation.reciver = conversation.participants.find((participant) => participant.toString() !== (""+user._id));
      return newConversation;
    })


    res.status(200).json(conversationsWithRecivers);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Error fetching conversations' });
  }
};
