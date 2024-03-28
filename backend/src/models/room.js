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
      ref: "Message",
    },
  ],
});

export default roomSchema;
