import { Types } from 'mongoose';
import asyncWrapper from '../middleware/asyncWrapper';
import { Room, Message } from '../models';
import CustomError from '../utility/error';

const getRooms = asyncWrapper(async (req, res) => {
  const { namespace } = req.query;

  const response = await Room
                        .find({ namespace }, 'name namespace messages')
                        .populate('messages')
                        .exec();

  if (!response) {
    throw new CustomError(`could not find any rooms in namespace: ${namespace}`, 404);
  }

  const rooms = response.map((room) => {
    return {
      id: String(room._id),
      name: room.name,
      messages: room.messages,
    };
  })
  res.status(200).json(rooms);
});

const deleteRooms = asyncWrapper(async (req, res) => {
  const { roomId } = req.body;
  await Room.deleteOne({ _id: new Types.ObjectId(roomId) }).exec();
  await Message.deleteMany({ roomId }).exec();
  res.sendStatus(204);
})

export {
  getRooms,
  deleteRooms,
}
