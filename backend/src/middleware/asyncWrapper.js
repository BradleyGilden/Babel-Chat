/**
 * Wraps asynchronous methods, mainly those making external api requests, to handle errors
 * @param {asyncCallBack} callBack
 * @returns {Promise<null>}
 */

const asyncWrapper = (callBack) => {
  return async (req, res, next) => {
    try {
      await callBack(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};

export default asyncWrapper;
