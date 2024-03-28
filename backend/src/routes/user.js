/**
 * This module is responsible for user routes
 */

import express from "express";
import {
  createUser,
  validateUser,
  updateUser,
  logoutUser,
} from "../controllers";

const userRouter = express.Router();

userRouter.delete("/logout", logoutUser);
userRouter.post("/update", updateUser);
userRouter.post("/signup", createUser);
userRouter.post("/login", validateUser);

export default userRouter;
