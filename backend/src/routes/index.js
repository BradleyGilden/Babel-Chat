/**
 * This module is used for organising the application routes
 */

import express from 'express';
import { serverCheck, dbCheck, createUser, validateUser } from '../controllers';

const baseRouter = express.Router();

baseRouter
.get('/', serverCheck)
.get('/db', dbCheck)
.post('/user/signup', createUser)
.post('/user/login', validateUser);

export default baseRouter;
