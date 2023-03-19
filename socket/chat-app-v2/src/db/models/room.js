const mongoose = require("mongoose");

const RoomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  users: [
    {
      userId: String,
    },
  ],
  usersCount: {
    type: Number,
    default: 0,
  },
});

const Room = mongoose.model("Room", RoomSchema);

module.exports = Room;
