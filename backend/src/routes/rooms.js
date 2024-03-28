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

roomRouter.get("/", getRooms);
roomRouter.delete("/", deleteRooms);
roomRouter.post("/", createRoomsGlobal);
roomRouter.post("/private", createRoomsPrivate);
roomRouter.get("/private", getRoomsPrivate);
roomRouter.delete("/private", deleteRoomsPrivate);
roomRouter.post("/private/join", joinRoomsPrivate);

export default roomRouter;
