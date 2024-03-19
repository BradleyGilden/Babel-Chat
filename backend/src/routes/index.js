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
} from '../controllers';

const baseRouter = express.Router();

baseRouter
// status checks
.get('/', serverCheck)
.get('/db', dbCheck)
// User creation and authentication
.post('/user/signup', createUser)
.post('/user/login', validateUser)
.get('/rooms', getRooms);

export default baseRouter;
