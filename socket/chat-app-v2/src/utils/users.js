const Room = require("../db/models/room");

const rooms = Room.find({});

const addUser = ({ id, username, room }) => {
  Object.values(rooms)[0].users.push({ _id: id, username });
  Object.values(rooms)[0].count++;
};

const removeUser = ({ _id, room }) => {
  Object.values(rooms)[0].users.filter((user) => user._id !== _id);
  Object.values(rooms)[0].count--;
};

const getUsersInRoom = (room) => {
  return Object.values(rooms)[0].users;
};

module.exports = {
  rooms,
  addUser,
  removeUser,
  getUsersInRoom,
};
