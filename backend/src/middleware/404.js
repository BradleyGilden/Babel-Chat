import { Request, Response } from 'express';

/**
 * default
 * @param {Request} req 
 * @param {Response} res 
 */

const notFound = (req, res) => {
  res.status(404).send(`Resource Not Found ${req.url}`);
}

export default notFound;
