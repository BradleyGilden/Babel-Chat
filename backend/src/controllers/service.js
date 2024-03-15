import { Request, Response } from 'express';
/**
 * Basic status check to see if backend service is operational
 * @param {Request} req 
 * @param {Response} res 
 */

const serviceCheck = (req, res) => {
  res.status(200).send("Backend service operational");
}

export default serviceCheck;
