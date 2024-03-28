import mongoose from "mongoose";

// create schema for a user
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minLength: 4,
    maxLength: 20,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true, // changed all input to lowercase
  },
  password: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    default: () =>
      "#" + (((1 << 24) * Math.random()) | 0).toString(16).padStart(6, "0"),
  },
  createdAt: {
    type: Date,
    default: () => Date.now(),
  },
  rooms: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Room",
    },
  ],
});

export default userSchema;
