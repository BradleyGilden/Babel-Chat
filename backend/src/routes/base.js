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

/**
 * @openapi
 * /api:
 *  get:
 *    tags:
 *      - Server Check
 *    description: Responds if server is running
 *    responses:
 *      200:
 *        description: Succesful response, shows backend is operational
 *        content:
 *          text/plain:
 *            schema:
 *              type: string
 *              example: Backend Service Operational
 */

baseRouter.get("/", serverCheck);

/**
 * @openapi
 * /api/db:
 *   get:
 *     tags:
 *       - Database Status Check
 *     summary: Checks the status of MongoDB connection
 *     description: Endpoint to check the status of the MongoDB connection.
 *     responses:
 *       '200':
 *         description: Successful response. Returns the status of the MongoDB connection.
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               enum:
 *                 - Disconnected
 *                 - Connected
 *                 - Connecting
 *                 - Disconnecting
 *                 - Database connection uninitialized
 */

baseRouter.get("/db", dbCheck);

/**
 * @openapi
 * /api/notifications:
 *   get:
 *     tags:
 *       - Notifications
 *     summary: Get notification messages
 *     description: Endpoint to retrieve notification messages for a specific user.
 *     parameters:
 *       - in: query
 *         name: username
 *         schema:
 *           type: string
 *         required: true
 *         description: The username for which to retrieve notification messages.
 *     responses:
 *       '200':
 *         description: Successful response. Returns an array of notification messages.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/NotificationMessage'
 *       '500':
 *         description: Server Error. Something went wrong with the database.
 * components:
 *   schemas:
 *     NotificationMessage:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: "6601d904735a8346d3654427"
 *           description: The unique identifier of the notification message.
 *         text:
 *           type: string
 *           example: "JackSparrow invites you to join them in a private chat\nRoom: NewPrivate\nCode: o1AivadF"
 *           description: The text of the notification message.
 *         date:
 *           type: string
 *           format: date-time
 *           description: The date and time when the notification message was sent.
 *         username:
 *           type: string
 *           example: "Conan"
 *           description: The username of the recipient of the notification message.
 *         __v:
 *           type: number
 *           description: Version key for internal use by MongoDB.
 */

baseRouter.get("/notifications", getNotifications);

/**
 * @openapi
 * /api/translate:
 *   get:
 *     tags:
 *       - Translate
 *     summary: Get translation
 *     description: Endpoint to translate text to the specified language code.
 *     parameters:
 *       - in: query
 *         name: text
 *         schema:
 *           type: string
 *         required: true
 *         description: The text to translate.
 *       - in: query
 *         name: code
 *         schema:
 *           type: string
 *         required: true
 *         description: The language code to translate the text to.
 *     responses:
 *       '200':
 *         description: Successful response. Returns the translated text.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 translation:
 *                   type: string
 *                   example: "Bonjour le monde"
 *                   description: The translated text.
 *       '500':
 *         description: Server Error. Something went wrong with the database.
 */

baseRouter.get("/translate", getTranslation);

/**
 * @openapi
 * /api/translate/save:
 *   post:
 *     tags:
 *       - Save Translation
 *     summary: Update translation for a message
 *     description: Endpoint to update the translation for a message identified by nanoId.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nanoId:
 *                 type: string
 *                 description: The unique identifier (nanoId) of the message to update.
 *               translation:
 *                 type: string
 *                 description: The updated translation of the message.
 *             required:
 *               - nanoId
 *               - translation
 *     responses:
 *       200:
 *         description: Successfully updated the translation for the message.
 *       500:
 *         description: Server Error. Something went wrong with the database.
 */

baseRouter.post("/translate/save", postUpdateTranslation);

export default baseRouter;
