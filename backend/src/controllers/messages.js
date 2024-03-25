import { Types } from 'mongoose';
import asyncWrapper from '../middleware/asyncWrapper';
import { Room, Message, User } from '../models';
import CustomError from '../utility/error';

const getNotifications = asyncWrapper(async (req, res) => {
  const { username } = req.query;

  const notifications = await Message.find({ username, currentRoom: { $exists: false } });

  const notificationArray = Array.from(notifications);

  res.status(200).json(notificationArray);
});

export {
  getNotifications,
}
