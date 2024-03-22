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
  const { roomId, username, roomName } = req.body;
  await Room.deleteOne({ _id: new Types.ObjectId(roomId) }).exec();

  global.io.emit('delete room', { roomId, username, roomName });

  await Message.deleteMany({ roomId }).exec();
  res.sendStatus(204);
})

const createRoomsGlobal = asyncWrapper(async (req, res) => {
  const { roomName, namespace } = req.body;

  const room = new Room({ name: roomName, namespace });
  let newRoom = await room.save();
  newRoom = {
    name: newRoom.name,
    id: String(newRoom.id),
    messages: [],
    users: [],
    createdAt: newRoom.createdAt,
    color: newRoom.color,
  };
  // emit room obj to new the required namespace
  global.io.of(namespace).emit('add room', { newRoom, namespace });
  res.sendStatus(201);
})

export {
  getRooms,
  deleteRooms,
  createRoomsGlobal,
}
