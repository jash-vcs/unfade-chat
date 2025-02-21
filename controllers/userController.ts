import { Request, Response } from 'express';
import User from '../models/User';

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, profilePicSrc, myServerUserId } = req.body;
    const user = new User({ name, profilePicSrc, myServerUserId });
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Error creating user' });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { name, profilePicSrc, lastSeenOn } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, profilePicSrc, lastSeenOn },
      { new: true }
    );

    if (!updatedUser) {
    res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: 'Error updating user' });
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching users' });
  }
};