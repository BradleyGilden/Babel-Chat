import { Types } from "mongoose";
import asyncWrapper from "../middleware/asyncWrapper";
import { Room, Message, User } from "../models";
import CustomError from "../utility/error";

/**
 * GET list of globalrooms => /api/rooms
 * 
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} JSON response with room list.
 */

const getRooms = asyncWrapper(async (req, res) => {
  const { namespace } = req.query;

  // poplulate room object with messages
  const response = await Room.find({ namespace }, "name namespace messages")
    .populate("messages")
    .exec();

  if (!response) {
    throw new CustomError(
      `could not find any rooms in namespace: ${namespace}`,
      404,
    );
  }

  const rooms = response.map((room) => {
    return {
      id: String(room._id),
      name: room.name,
      messages: room.messages,
    };
  });
  res.status(200).json(rooms);
});

/**
 * DELETE globalroom => /api/rooms
 * 
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */

const deleteRooms = asyncWrapper(async (req, res) => {
  const { roomId, username, roomName } = req.body;
  await Room.deleteOne({ _id: new Types.ObjectId(roomId) }).exec();

  // emit delete room event to delete room for other users
  global.io.emit("delete room", { roomId, username, roomName });

  await Message.deleteMany({ roomId }).exec();
  res.sendStatus(204);
});

/**
 * POST create an instance of a global room => /api/rooms
 * 
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} JSON response with room list.
 */

const createRoomsGlobal = asyncWrapper(async (req, res) => {
  const { roomName } = req.body;

  const room = new Room({ name: roomName, namespace: "/" });
  let newRoom = await room.save();

  // emit room obj to new the required namespace
  global.io.of("/").emit("add room", {
    name: newRoom.name,
    id: String(newRoom.id),
    messages: [],
  });
  res.sendStatus(201);
});

/**
 * POST create private room instance => /api/rooms
 * 
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} JSON response with room object
 */

const createRoomsPrivate = asyncWrapper(async (req, res) => {
  const { roomName, userId, passcode } = req.body;

  const room = new Room({
    name: roomName,
    passcode,
    namespace: "/private",
    ownerId: userId,
  });

  const newRoom = await room.save();

  const user = await User.findById(new Types.ObjectId(userId)).exec();
  user.rooms.push(newRoom._id);
  await user.save();

  res.status(201).json({
    passcode: newRoom.passcode,
    name: newRoom.name,
    id: String(newRoom.id),
    messages: [],
    ownerId: newRoom.ownerId,
  });
});

/**
 * POST join rooms endpoint => /api/translate
 * 
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} JSON response with room object
 */

const joinRoomsPrivate = asyncWrapper(async (req, res) => {
  const { roomName, passcode, userId } = req.body;

  const room = await Room.findOne({ name: roomName, passcode }).exec();

  if (!room)
    throw new CustomError("Room name and password does not match", 401);
  if (!room.ownerId === userId)
    throw new CustomError(`You already own ${room.name}`, 401);

  await User.findByIdAndUpdate(new Types.ObjectId(userId), {
    $push: { rooms: room._id },
  }).exec();

  res.status(200).json({
    passcode: room.passcode,
    name: room.name,
    id: String(room._id),
    messages: room.messages,
    ownerId: room.ownerId,
  });
});

/**
 * GET list of private rooms belonging to a user => /api/translate
 * 
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} JSON response with room object
 */

const getRoomsPrivate = asyncWrapper(async (req, res) => {
  const { userId } = req.query;
  let rooms = [];

  // populate user with rooms, and populate rooms with messages
  const user = await User.findById(new Types.ObjectId(userId))
    .populate({
      path: "rooms",
      populate: {
        path: "messages",
      },
    })
    .exec();
  if (!user) throw new CustomError("User does not exist", 401);
  rooms = user.rooms.map((room) => {
    return {
      id: String(room._id),
      name: room.name,
      messages: room.messages,
      passcode: room.passcode,
      ownerId: room.ownerId,
    };
  });
  res.status(200).json(rooms);
});

/**
 * DELETE private rooms for owner and other members => /api/translate
 * 
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */

const deleteRoomsPrivate = asyncWrapper(async (req, res) => {
  const { roomId, userId, roomName } = req.body;
  const room = await Room.findById(new Types.ObjectId(roomId)).exec();
  // if owner delete room and chat history for everyone
  if (room.ownerId === userId) {
    await room.deleteOne();
    await Message.deleteMany({ roomId }).exec();
    global.io.of("/private").emit("delete room", { roomId, userId, roomName });
    const user = await User.findById(new Types.ObjectId(userId)).exec();
    user.rooms = user.rooms.filter((room) => String(room._id) !== roomId);
    await user.save();
    // if not owner, just delete room relationship
  } else {
    const user = await User.findById(new Types.ObjectId(userId)).exec();
    user.rooms = user.rooms.filter((room) => String(room._id) !== roomId);
    await user.save();
  }

  res.sendStatus(204);
});

export {
  getRooms,
  deleteRooms,
  createRoomsGlobal,
  createRoomsPrivate,
  getRoomsPrivate,
  deleteRoomsPrivate,
  joinRoomsPrivate,
};
