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

/**
 * @openapi
 * /api/user/logout:
 *   delete:
 *     tags:
 *       - User
 *     summary: Logout user
 *     description: Endpoint to logout a user from the session.
 *     responses:
 *       '204':
 *         description: Successfully logged out the user.
 *       '500':
 *         description: Internal Server Error. Failed to logout user.
 */

userRouter.delete("/logout", logoutUser);

/**
 * @openapi
 * /api/user/update:
 *   post:
 *     tags:
 *       - User
 *     summary: Update user data fields
 *     description: Endpoint to update user data fields such as username and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               uid:
 *                 type: string
 *                 description: The MongoDB ID of the user.
 *                 example: "60f2b1b2e6e65f001fc2c4e1"
 *               fields:
 *                 type: object
 *                 description: The fields to update.
 *                 properties:
 *                   password:
 *                     type: string
 *                     description: The new password of the user.
 *                     example: "MemeFrog38"
 *                   newname:
 *                     type: string
 *                     description: The new username of the user.
 *                     example: "JohnCena"
 *                   oldname:
 *                     type: string
 *                     description: The current username of the user.
 *                     example: "YouCantSeeMe"
 *     responses:
 *       '204':
 *         description: Successfully updated user data fields.
 *       '401':
 *         description: Unauthorized. Username is taken.
 */

userRouter.post("/update", updateUser);

/**
 * @openapi
 * /api/user/signup:
 *   post:
 *     tags:
 *       - User
 *     summary: Sign up a new user
 *     description: Endpoint to sign up a new user by creating a document in the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: "Conan"
 *                 description: The username of the new user.
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The email address of the new user.
 *               password:
 *                 type: string
 *                 example: "ConanTheBarbarian0"
 *                 format: password
 *                 description: The password of the new user.
 *     responses:
 *       '201':
 *         description: Successfully created the user.
 *       '401':
 *         description: Unauthorized. Username or email is already taken.
 */

userRouter.post("/signup", createUser);

/**
 * @openapi
 * /api/user/login:
 *   post:
 *     tags:
 *       - User
 *     summary: Login a user
 *     description: Endpoint to login a user and return user information from the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The username of the user.
 *                 example: Conan
 *               password:
 *                 type: string
 *                 description: The password of the user.
 *                 example: ConanTheBarbarian0
 *     responses:
 *       '200':
 *         description: Successfully logged in the user.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The unique identifier of the user.
 *                   example: "60f2b1b2e6e65f001fc2c4e1"
 *                 username:
 *                   type: string
 *                   description: The username of the user.
 *                   example: Conan
 *                 color:
 *                   type: string
 *                   description: The color associated with the user.
 *                   example: "#000000"
 *                 rooms:
 *                   type: array
 *                   description: The rooms associated with the user.
 *       '401':
 *         description: Unauthorized. Invalid username or password.
 */

userRouter.post("/login", validateUser);

export default userRouter;
