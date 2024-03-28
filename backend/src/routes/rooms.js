/**
 * This module is responsible for rooms routes
 */

import express from "express";
import {
  getRooms,
  deleteRooms,
  createRoomsGlobal,
  createRoomsPrivate,
  getRoomsPrivate,
  deleteRoomsPrivate,
  joinRoomsPrivate,
} from "../controllers";

const roomRouter = express.Router();

/**
 * @openapi
 * /api/rooms:
 *   get:
 *     tags:
 *       - Rooms
 *     summary: Get list of global rooms
 *     description: Endpoint to retrieve a list of global rooms.
 *     parameters:
 *       - in: query
 *         name: namespace
 *         schema:
 *           type: string
 *         description: The namespace of the rooms to retrieve.
 *     responses:
 *       '200':
 *         description: Successfully retrieved list of rooms.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: The unique identifier of the room.
 *                     example: "660336e07aaba0793436df6d"
 *                   name:
 *                     type: string
 *                     description: The name of the room.
 *                     example: "Conference"
 *                   messages:
 *                     type: array
 *                     description: List of messages in the room.
 *                     items:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                           description: The unique identifier of the message.
 *                         text:
 *                           type: string
 *                           description: The text of the message.
 *                         date:
 *                           type: string
 *                           format: date-time
 *                           description: The date and time the message was sent.
 *                         username:
 *                           type: string
 *                           description: The username of the message sender.
 *                         roomId:
 *                           type: string
 *                           description: The unique identifier of the room the message belongs to.
 *       '404':
 *         description: No rooms found in the specified namespace.
 */

roomRouter.get("/", getRooms);

/**
 * @openapi
 * /api/rooms:
 *   delete:
 *     tags:
 *       - Rooms
 *     summary: Delete global room
 *     description: Endpoint to delete a global room and all associated messages.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               roomId:
 *                 type: string
 *                 description: The ID of the room to delete.
 *               username:
 *                 type: string
 *                 description: The username of the user deleting the room.
 *               roomName:
 *                 type: string
 *                 description: The name of the room to delete.
 *     responses:
 *       '204':
 *         description: Successfully deleted the global room and associated messages.
 */

roomRouter.delete("/", deleteRooms);

/**
 * @openapi
 * /api/rooms:
 *   post:
 *     tags:
 *       - Rooms
 *     summary: Create a global room
 *     description: Endpoint to create an instance of a global room.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               roomName:
 *                 type: string
 *                 description: The name of the room to create.
 *                 example: "MyGlobalRoom"
 *     responses:
 *       '201':
 *         description: Successfully created the global room.
 *       '500':
 *         description: Internal Server Error.
 */

roomRouter.post("/", createRoomsGlobal);

/**
 * @openapi
 * /api/rooms:
 *   post:
 *     tags:
 *       - Rooms
 *     summary: Create a private room instance
 *     description: Endpoint to create an instance of a private room.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               roomName:
 *                 type: string
 *                 description: The name of the private room to create.
 *                 example: "MyPrivateRoom"
 *               userId:
 *                 type: string
 *                 description: The ID of the user who owns the private room.
 *                 example: "60f2b1b2e6e65f001fc2c4e1"
 *               passcode:
 *                 type: string
 *                 description: The passcode required to join the private room.
 *                 example: "mySecretPasscode"
 *     responses:
 *       '201':
 *         description: Successfully created the private room.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 passcode:
 *                   type: string
 *                   description: The passcode of the private room.
 *                   example: "mySecretPasscode"
 *                 name:
 *                   type: string
 *                   description: The name of the private room.
 *                   example: "MyPrivateRoom"
 *                 id:
 *                   type: string
 *                   description: The ID of the private room.
 *                   example: "60f2b1b2e6e65f001fc2c4e1"
 *                 messages:
 *                   type: array
 *                   description: The messages in the private room.
 *                   items:
 *                     type: object
 *                 ownerId:
 *                   type: string
 *                   description: The ID of the owner of the private room.
 *                   example: "60f2b1b2e6e65f001fc2c4e1"
 */

roomRouter.post("/private", createRoomsPrivate);

/**
 * @openapi
 * /api/rooms/private:
 *   get:
 *     tags:
 *       - Rooms
 *     summary: Get list of private rooms belonging to a user
 *     description: Retrieve a list of private rooms belonging to a user, along with their messages.
 *     parameters:
 *       - in: query
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user.
 *     responses:
 *       '200':
 *         description: A list of private rooms belonging to the user.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: The ID of the room.
 *                   name:
 *                     type: string
 *                     description: The name of the room.
 *                   messages:
 *                     type: array
 *                     description: List of messages in the room.
 *                     items:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                           description: The ID of the message.
 *                         text:
 *                           type: string
 *                           description: The text of the message.
 *                         date:
 *                           type: string
 *                           format: date-time
 *                           description: The date and time when the message was sent.
 *                         nanoId:
 *                           type: string
 *                           description: The nano ID of the message.
 *                         currentRoom:
 *                           type: string
 *                           description: The current room of the message.
 *                         username:
 *                           type: string
 *                           description: The username of the message sender.
 *                         roomId:
 *                           type: string
 *                           description: The ID of the room where the message belongs.
 *                         __v:
 *                           type: number
 *                           description: Version number.
 *                   passcode:
 *                     type: string
 *                     description: The passcode of the room.
 *                   ownerId:
 *                     type: string
 *                     description: The ID of the owner of the room.
 *       '401':
 *         description: Unauthorized. User does not exist.
 */

roomRouter.get("/private", getRoomsPrivate);

/**
 * @openapi
 * /api/rooms/private:
 *   delete:
 *     tags:
 *       - Rooms
 *     summary: Delete private rooms
 *     description: Endpoint to delete private rooms for owner and other members.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               roomId:
 *                 type: string
 *                 description: The ID of the room to delete.
 *                 example: "609df2a87dd3d294c4d20f75"
 *               userId:
 *                 type: string
 *                 description: The ID of the user deleting the room.
 *                 example: "609df2a87dd3d294c4d20f76"
 *               roomName:
 *                 type: string
 *                 description: The name of the room to delete.
 *                 example: "Gaming"
 *     responses:
 *       '204':
 *         description: Successfully deleted the private room(s).
 */

roomRouter.delete("/private", deleteRoomsPrivate);

/**
 * @openapi
 * /api/rooms/private/join:
 *   post:
 *     tags:
 *       - Rooms
 *     summary: Join rooms
 *     description: Endpoint to join private rooms.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               roomName:
 *                 type: string
 *                 description: The name of the room to join.
 *                 example: "Gaming"
 *               passcode:
 *                 type: string
 *                 description: The passcode of the room to join.
 *                 example: "password123"
 *               userId:
 *                 type: string
 *                 description: The ID of the user joining the room.
 *                 example: "609df2a87dd3d294c4d20f76"
 *     responses:
 *       '200':
 *         description: Successfully joined the private room.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 passcode:
 *                   type: string
 *                   description: The passcode of the joined room.
 *                   example: "password123"
 *                 name:
 *                   type: string
 *                   description: The name of the joined room.
 *                   example: "Gaming"
 *                 id:
 *                   type: string
 *                   description: The ID of the joined room.
 *                   example: "609df2a87dd3d294c4d20f75"
 *                 messages:
 *                   type: array
 *                   description: The messages in the joined room.
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         description: The ID of the message.
 *                         example: "609df2a87dd3d294c4d20f75"
 *                       text:
 *                         type: string
 *                         description: The content of the message.
 *                         example: "Hello, welcome to the room!"
 *                       date:
 *                         type: string
 *                         description: The date of the message.
 *                         example: "2024-05-01T12:00:00Z"
 *                 ownerId:
 *                   type: string
 *                   description: The ID of the owner of the joined room.
 *                   example: "609df2a87dd3d294c4d20f77"
 *       '401':
 *         description: Unauthorized - Room name and password do not match or user already owns the room.
 */

roomRouter.post("/private/join", joinRoomsPrivate);

export default roomRouter;
