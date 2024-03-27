import mongoose from "mongoose";

/**
 * establishes the servers connection to mongoose
 */
const mongooseConnect = async () => {
  // show connection log when mongoose is eventually connected
  mongoose.connection.on("connected", () =>
    console.log("Mongodb connection established"),
  );
  await mongoose.connect(process.env.MONGO_URI);
};

export default mongooseConnect;
