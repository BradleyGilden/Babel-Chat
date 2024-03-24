/**
 * This module is used for organising the application routes
 */

import express from 'express';
import {
  serverCheck,
  dbCheck,
  createUser,
  validateUser,
  getRooms,
  deleteRooms,
  createRoomsGlobal,
  createRoomsPrivate,
  getRoomsPrivate,
  deleteRoomsPrivate,
  joinRoomsPrivate,
} from '../controllers';

const baseRouter = express.Router();

baseRouter
// status checks
.get('/', serverCheck)
.get('/db', dbCheck)
// User creation and authentication
.post('/user/signup', createUser)
.post('/user/login', validateUser)
// Room handlers
.get('/rooms', getRooms)
.delete('/rooms', deleteRooms)
.post('/rooms', createRoomsGlobal)
.post('/rooms/private', createRoomsPrivate)
.get('/rooms/private', getRoomsPrivate)
.delete('/rooms/private', deleteRoomsPrivate)
.post('/rooms/private/join', joinRoomsPrivate);

export default baseRouter;
