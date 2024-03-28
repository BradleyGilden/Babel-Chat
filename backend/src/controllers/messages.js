import asyncWrapper from "../middleware/asyncWrapper";
import { Message } from "../models";
import translate from "google-translate-api-x";

/**
 * GET notification message endpoint => /api/notifications
 * 
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} JSON response with message.
 */

const getNotifications = asyncWrapper(async (req, res) => {
  const { username } = req.query;

  const notifications = await Message.find({
    username,
    currentRoom: { $exists: false },
  }).exec();

  const notificationArray = Array.from(notifications);

  res.status(200).json(notificationArray);
});

/**
 * GET translation endpoint => /api/translate
 * 
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} JSON response with translation.
 */

const getTranslation = asyncWrapper(async (req, res) => {
  const { text, code } = req.query;

  const translation = await translate(text, { to: code, forceTo: true });

  res.status(200).json({ translation: translation.text });
});

/**
 * POST translation endpoint to update translation in message =>
 * /api/translate/save
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} JSON response with translation.
 */

const postUpdateTranslation = asyncWrapper(async (req, res) => {
  const { nanoId, translation } = req.body;

  await Message.findOneAndUpdate({ nanoId }, { translation }).exec();

  res.sendStatus(200);
});

export { getNotifications, getTranslation, postUpdateTranslation };
