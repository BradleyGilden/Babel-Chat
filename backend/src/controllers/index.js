/**
 * This module is used for organising the application controllers
 */


import { serverCheck, dbCheck } from './service';
import { createUser, validateUser } from './user';
import {
  getRooms,
  deleteRooms,
  createRoomsGlobal,
  createRoomsPrivate,
  getRoomsPrivate,
} from './rooms';

export {
  serverCheck,
  dbCheck,
  createUser,
  validateUser,
  getRooms,
  deleteRooms,
  createRoomsGlobal,
  createRoomsPrivate,
};
