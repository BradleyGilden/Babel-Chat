import asyncWrapper from '../middleware/asyncWrapper';
import { Message } from '../models';
import translate from 'google-translate-api-x';
import CustomError from '../utility/error';

const getNotifications = asyncWrapper(async (req, res) => {
  const { username } = req.query;

  const notifications = await Message.find({ username, currentRoom: { $exists: false } }).exec();

  const notificationArray = Array.from(notifications);

  res.status(200).json(notificationArray);
});

const getTranslation = asyncWrapper(async (req, res) => {
  const { text, code } = req.query;

  const translation = await translate(text, { to: code, forceTo: true });

  res.status(200).json({ translation: translation.text });
})

const postUpdateTranslation = asyncWrapper(async (req, res) => {
  const { nanoId, translation } = req.body;

  await Message.findOneUpdate({ nanoId }, { translation }).exec();

  res.sendStatus(200);
});

export {
  getNotifications,
  getTranslation,
  postUpdateTranslation,
}
