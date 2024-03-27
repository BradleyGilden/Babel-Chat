/**
 * This module is used for organising the application routes
 */

import express from 'express';
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
} from '../controllers';

const baseRouter = express.Router();

baseRouter
// status checks
.get('/', serverCheck)
.get('/db', dbCheck)
// User creation and authentication
.delete('/user/logout', logoutUser)
.post('/user/update', updateUser)
.post('/user/signup', createUser)
.post('/user/login', validateUser)
// Room handlers
.get('/rooms', getRooms)
.delete('/rooms', deleteRooms)
.post('/rooms', createRoomsGlobal)
.post('/rooms/private', createRoomsPrivate)
.get('/rooms/private', getRoomsPrivate)
.delete('/rooms/private', deleteRoomsPrivate)
.post('/rooms/private/join', joinRoomsPrivate)
// Notification handler
.get('/notifications', getNotifications)
// translation handler
.get('/translate', getTranslation)
.post('/translate/save', postUpdateTranslation);

export default baseRouter;
