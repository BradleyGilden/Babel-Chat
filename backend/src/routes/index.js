/**
 * This module is used for organising the application routes
 */

import express from 'express';
import { serverCheck, dbCheck } from '../controllers';

const baseRouter = express.Router();

baseRouter.get('/', serverCheck);
baseRouter.get('/db', dbCheck);

export default baseRouter;
