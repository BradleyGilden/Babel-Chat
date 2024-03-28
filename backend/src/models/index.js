/**
 * The models module defines the schema for the mongodb database models using mongoose
 */

import mongoose from "mongoose";
import roomSchema from './room';
import messageSchema from './message';
import userSchema from './user';

// instantiate models for collections users and rooms
const User = mongoose.model("User", userSchema);
const Room = mongoose.model("Room", roomSchema);
const Message = mongoose.model("Message", messageSchema);

export { User, Room, Message };
