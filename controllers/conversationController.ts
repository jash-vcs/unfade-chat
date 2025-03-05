import { Request, Response } from "express";
import Conversation from "../models/Conversation";
import User from "../models/User";

export const createConversation = async (req: Request, res: Response) => {
  try {
    const { participants } = req.body;
    const users = await User.find({ myServerUserId: { $in: participants } });
    const userIds = users.map((user) => user._id);
    const conversation = await Conversation.findOne({
      participants: { $all: userIds },
    });
    if (conversation) {
      res.status(200).json(conversation);
      return;
    }
    const newConversation = new Conversation({ participants: userIds });
    await newConversation.save();
    res.status(201).json(conversation);
    return;
  } catch (error) {
    res.status(500).json({ error: "Error creating conversation" });
    return;
  }
};

export const getConversationsByUserId = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const senderUser = await User.findOne({ myServerUserId: userId });
    if (!senderUser) {
      res.status(404).json({ error: "User not found" });
      return;
    }
    const populatedConversations = await Conversation.find({
      participants: senderUser._id,
    })
      .populate("participants")
      .sort({ createdAt: -1 });
    const conversationsWithRecivers = populatedConversations.map(
      (conversation) => {
        const newConversation: any = conversation.toObject();
        newConversation.reciver = conversation.participants.find(
          (participant) => participant.toString() !== "" + senderUser._id
        );
        return newConversation;
      }
    );

    res.status(200).json(conversationsWithRecivers);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error fetching conversations" });
  }
};
