import { Room, Message } from '../models';
import { Types } from 'mongoose';

const updateMessage = (messageObj) => {
  const message = new Message(messageObj);

  message.save()
          .then((savedMessage) => {
            Room.findByIdAndUpdate(new Types.ObjectId(messageObj.roomId), {$push: { messages: savedMessage._id }})
                .catch((err) => {
                  console.log(err);
                });
          })
          .catch((err) => {
            console.log(err);
          })
};

const updateNotification = (messageObj) => {
  const message = new Message(messageObj);
  console.log('saved')
  message.save()
          .then((savedMessage) => {
            console.log(savedMessage);
          })
          .catch((err) => {
            console.log(err);
          })
};

export {
  updateMessage,
  updateNotification,
};
