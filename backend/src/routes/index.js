/**
 * This module is used for organising the application routes
 */

import baseRouter from './base';
import userRouter from './user';
import roomRouter from './rooms';

baseRouter.use('/user', userRouter);
baseRouter.use('/rooms', roomRouter);

export default baseRouter;
