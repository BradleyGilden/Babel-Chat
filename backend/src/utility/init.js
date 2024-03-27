import mongooseConnect from "../db/connect";

/**
 * Establishes connection
 * @param { express.Express } app instance of express()
 * @returns { http.Server }  server instance
 */
const serverInit = async (app) => {
  // establish database connection
  await mongooseConnect();

  return app.listen(process.env.PORT || 3000, () => {
    console.log("server starting on port 3000");
  });
};

export default serverInit;
