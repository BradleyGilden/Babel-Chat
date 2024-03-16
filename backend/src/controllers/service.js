/**
 * Basic status check to see if backend service is operational
 * @param { express.Request} req 
 * @param { express.Response } res 
 */

const serviceCheck = (req, res) => {
  res.status(200).send("Backend service operational");
}

export default serviceCheck;
