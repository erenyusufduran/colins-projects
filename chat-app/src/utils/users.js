const Room = require("../models/room");
const User = require("../models/user");

const addUser = async ({ userId, name, room }) => {
  const room = await Room.findOne({ _id: room });
  room.users.push({ userId, username: name });
  await room.save();
  const user = await User.findOne({ _id: userId });
  return user;
};

const removeUser = async (userId, room) => {
  const room = await Room.findOne({ _id: room });
  room.users = room.users.filter((user) => user._id !== userId);
  await room.save();
};

const getUser = async (_id) => await User.findOne({ _id });

const getUsersInRoom = async (room) => {
  const room = await Room.findOne({ _id: room });
  return room.users;
};

module.exports = { addUser, removeUser, getUser, getUsersInRoom };
