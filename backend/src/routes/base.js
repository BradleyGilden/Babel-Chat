/**
 * This module is the base router
 */

import express from "express";
import {
  serverCheck,
  dbCheck,
  getNotifications,
  getTranslation,
  postUpdateTranslation,
} from "../controllers";

const baseRouter = express.Router();

baseRouter.get("/", serverCheck);
baseRouter.get("/db", dbCheck);
baseRouter.get("/notifications", getNotifications);
baseRouter.get("/translate", getTranslation);
baseRouter.post("/translate/save", postUpdateTranslation);

export default baseRouter;
