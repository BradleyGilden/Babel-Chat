/**
 * This module is used for organising the application routes
 */

import express from "express";
import {
  serverCheck,
  dbCheck,
  createUser,
  validateUser,
  updateUser,
  logoutUser,
  getRooms,
  deleteRooms,
  createRoomsGlobal,
  createRoomsPrivate,
  getRoomsPrivate,
  deleteRoomsPrivate,
  joinRoomsPrivate,
  getNotifications,
  getTranslation,
  postUpdateTranslation,
} from "../controllers";

const baseRouter = express.Router();

// status checks
baseRouter.get("/", serverCheck);
baseRouter.get("/db", dbCheck);
// User creation and authentication
baseRouter.delete("/user/logout", logoutUser);
baseRouter.post("/user/update", updateUser);
baseRouter.post("/user/signup", createUser);
baseRouter.post("/user/login", validateUser);
// Room handlers
baseRouter.get("/rooms", getRooms);
baseRouter.delete("/rooms", deleteRooms);
baseRouter.post("/rooms", createRoomsGlobal);
baseRouter.post("/rooms/private", createRoomsPrivate);
baseRouter.get("/rooms/private", getRoomsPrivate);
baseRouter.delete("/rooms/private", deleteRoomsPrivate);
baseRouter.post("/rooms/private/join", joinRoomsPrivate);
// Notification handler
baseRouter.get("/notifications", getNotifications);
// translation handler
baseRouter.get("/translate", getTranslation);
baseRouter.post("/translate/save", postUpdateTranslation);

export default baseRouter;
