const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  users: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      username: {
        type: String,
        required: true,
      },
    },
  ],
});

const Room = mongoose.model("Room", roomSchema);

module.exports = Room;
