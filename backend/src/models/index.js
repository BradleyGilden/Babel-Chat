/**
 * The models module defines the schema for the mongodb database models using mongoose
 */

import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  // Define properties for each message
  // For example:
  text: String,
  translation: String,
  date: Date,
  nanoId: String,
  currentRoom: String,
  username: String,
  roomId: String,
  userId: String,
  // Add other properties as needed
});

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
    lowercase: true,  // changed all input to lowercase
  },
  password: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    default: () => "#" + ((1 << 24) * Math.random() | 0).toString(16).padStart(6, "0"),
  },
  createdAt: {
    type: Date,
    default: () => Date.now(),
  },
  rooms: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Room',
    }
  ]
});

// create schema for a room
const roomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 4,
    maxLength: 20,
    trim: true,
  },
  passcode: String,
  ownerId: String,
  createdAt: {
    type: Date,
    default: () => Date.now(),
  },
  namespace: {
    type: String,
    required: true,
  },
  messages: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Message',
    }
  ],
})

// virtual method to calculate number of Users in a room
roomSchema.virtual('userCount').get(function() {
  return this.users?.length || 0;
});

// instantiate models for collections users and rooms
const User = mongoose.model('User', userSchema);
const Room = mongoose.model('Room', roomSchema);
const Message = mongoose.model('Message', messageSchema);

export {
  User,
  Room,
  Message
}
