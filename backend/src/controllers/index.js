/**
 * This module is used for organising the application controllers
 */


import { serverCheck, dbCheck } from './service';
import { createUser, validateUser, updateUser, logoutUser } from './user';
import { getNotifications, getTranslation ,postUpdateTranslation } from './messages';
import {
  getRooms,
  deleteRooms,
  createRoomsGlobal,
  createRoomsPrivate,
  getRoomsPrivate,
  deleteRoomsPrivate,
  joinRoomsPrivate,
} from './rooms';

export {
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
};
