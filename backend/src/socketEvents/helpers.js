import { Room, Message } from "../models";
import { Types } from "mongoose";

/**
 * Populates rooms with reference id's to messages that were sent within them
 * @param {object} messageObj a message document with data that describes the
 * instance of the message
 * @return {void}
 */

const updateMessage = (messageObj) => {
  const message = new Message(messageObj);

  message
    .save()
    .then((savedMessage) => {
      Room.findByIdAndUpdate(new Types.ObjectId(messageObj.roomId), {
        $push: { messages: savedMessage._id },
      }).catch((err) => {
        console.log(err);
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

/**
 * Saves a message of type notification
 * @param {object} messageObj a message document with data that describes the
 * instance of the message
 * @return {void}
 */

const updateNotification = (messageObj) => {
  const message = new Message(messageObj);
  message
    .save()
    .then((_savedMessage) => {
      // message is now saved
    })
    .catch((err) => {
      console.log(err);
    });
};

export { updateMessage, updateNotification };
