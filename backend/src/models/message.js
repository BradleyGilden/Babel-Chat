import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  // Define properties for each message
  text: String,
  translation: String,
  date: Date,
  nanoId: String,
  currentRoom: String,
  username: String,
  roomId: String,
  userId: String,
});

export default messageSchema;
