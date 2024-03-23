import { Types } from 'mongoose';
import asyncWrapper from '../middleware/asyncWrapper';
import { Room, Message, User } from '../models';
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
  const { roomName } = req.body;

  const room = new Room({ name: roomName, namespace: '/' });
  let newRoom = await room.save();

  // emit room obj to new the required namespace
  global.io.of('/').emit('add room', {
    name: newRoom.name,
    id: String(newRoom.id),
    messages: [],
  });
  res.sendStatus(201);
})

const createRoomsPrivate = asyncWrapper(async (req, res) => {
  const { roomName, userId, passcode } = req.body;
  console.log(roomName, userId, passcode)
  const room = new Room({ name: roomName, passcode, namespace: '/private', ownderId: userId });

  const newRoom = await room.save()

  const user = await User.findById(new Types.ObjectId(userId)).exec();
  user.rooms.push(newRoom._id);
  await user.save();

  res.status(201).json({
    passcode: newRoom.passcode,
    name: newRoom.name,
    id: String(newRoom.id),
    messages: [],
  });
});

const getRoomsPrivate = asyncWrapper(async (req, res) => {
  const { userId } = req.query;
  let rooms = []
  const user = await User.findById(new Types.ObjectId(userId)).populate({
    path: 'rooms',
    populate: {
      path: 'messages'
    }
  }).exec();
  if (!user) throw new CustomError('User does not exist', 401);
  rooms = user.rooms.map((room) => {
    return {
      id: String(room._id),
      name: room.name,
      messages: room.messages,
      passcode: room.passcode,
    };
  });
  res.status(200).json(rooms)
});

const deleteRoomsPrivate = asyncWrapper(async (req, res) => {
  const { roomId, userId, roomName } = req.body;

  const room = await Room.findById(new Types.ObjectId(roomId)).exec()
  if (room.ownerId === userId) {
    await room.deleteOne();
    await Message.deleteMany({ roomId }).exec();
    global.io.of("/private").emit('delete room', { roomId, userId, roomName });
  } else {
    const user = await User.findById(new Types.ObjectId(userId)).exec();
    user.rooms = user.rooms.filter((room) => String(room._id) !== roomId);
    await user.save();
  }

  res.sendStatus(204);
})

export {
  getRooms,
  deleteRooms,
  createRoomsGlobal,
  createRoomsPrivate,
  getRoomsPrivate,
  deleteRoomsPrivate,
}
