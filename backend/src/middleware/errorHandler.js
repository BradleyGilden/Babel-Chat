import CustomError from '../utility/error';
import { Request, Response } from 'express';

/**
 * Middleware used to handle any error thrown in the express application as a response
 * to avoid application failure
 * @param {Error} err error object thrown by one of the controllers
 * @param {Request} req express request object
 * @param {Response} res express response object
 * @param {*} next calls next middleware
 * @returns {void}
 */

const errorHandler = (err, req, res, next) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({ message: err.message})
  }
  return res.status(500).json({ message: err.message || 'Something went wrong ...'})
}

export default errorHandler;
