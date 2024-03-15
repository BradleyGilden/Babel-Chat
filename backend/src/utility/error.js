/**
 * @extends Error
 * A custom error class that inherits the Error class.
 * It is used for unexpected operation errors that are not caused by server downtime
 */

class CustomError extends Error {
  /**
   * creates CustomError instance
   * @param {string} message the error message 
   * @param {number} statusCode [statusCode=500] - the status code produced upon error
   */
  constructor(message, statusCode) {
      super(message); // Call the parent constructor (Error class)
      this.statusCode = statusCode || 500;
      this.name = this.constructor.name; // Set the name of the error to the class name
      Error.captureStackTrace(this, this.constructor); // Capture the stack trace
  }
}

export default CustomError;
