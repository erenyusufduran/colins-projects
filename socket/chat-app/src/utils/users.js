const Room = require("../models/room");
const User = require("../models/user");

const addUser = async ({ userId, name, _roomId }) => {
  const room = await Room.findOne({ _id: _roomId });
  console.log(room);
  room.users.push({ userId, username: name });
  await room.save();
  const user = await User.findOne({ _id: userId });
  user.lastRoom = room._id;
  await user.save();
  return user;
};

const removeUser = async (userId, _roomId) => {
  const room = await Room.findOne({ _id: _roomId });
  room.users = room.users.filter((user) => user._id !== userId);
  await room.save();
};

const getUser = async (_id) => await User.findOne({ _id });

const getUsersInRoom = async (_roomId) => {
  const room = await Room.findOne({ _id: _roomId });
  return room.users;
};

module.exports = { addUser, removeUser, getUser, getUsersInRoom };
