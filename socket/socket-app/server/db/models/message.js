const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema(
  {
    message: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    room: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", MessageSchema);

module.exports = Message;
