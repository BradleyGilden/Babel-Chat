/**
 * Establishes connection
 * @param {*} mongooseConnector 
 * @param {*} serverApp 
 * @returns { http.Server }  server instance
 */
const serverInit = async (mongooseConnector, serverApp) => {
  // establish database connection
  await mongooseConnector();

  return app.listen(PORT, () => {
    console.log("server starting on port 3000");
  });
};
