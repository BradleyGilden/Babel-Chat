/**
 * This module is used for organising the application routes
 */

import express from 'express';
import { serviceCheck } from '../controllers';

const baseRouter = express.Router();

baseRouter.get('/', serviceCheck);

export default baseRouter;
