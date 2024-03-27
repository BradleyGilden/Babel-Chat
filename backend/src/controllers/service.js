import mongoose from "mongoose";

/**
 * Basic status check to see if backend service is operational
 * @param {express.Request} _req unused
 * @param { express.Response } res
 */

const serverCheck = (_req, res) => {
  res.status(200).send("Backend service operational");
};

/**
 * Checks the status of MongoDB connection
 * @param {express.Request} _req unused
 * @param { express.Response } res
 * @returns { void }
 */
const dbCheck = (_req, res) => {
  switch (mongoose.connection.readyState) {
    case 0:
      return res.status(200).send("Disconnected");
    case 1:
      return res.status(200).send("Connected");
    case 2:
      return res.status(200).send("Connecting");
    case 3:
      return res.status(200).send("Disconnecting");
    default:
      return res.status(200).send("Database connection unitialized");
  }
};

export { serverCheck, dbCheck };
