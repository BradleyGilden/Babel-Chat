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
roomRouter.post("/", createRoomsGlobal);
roomRouter.post("/private", createRoomsPrivate);
roomRouter.get("/private", getRoomsPrivate);
roomRouter.delete("/private", deleteRoomsPrivate);
roomRouter.post("/private/join", joinRoomsPrivate);

export default roomRouter;
