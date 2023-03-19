const Message = require("../models/message");

const generateMessage = async (user, text) => {
  if (user === "Admin") {
    return {
      user,
      text,
      createdAt: new Date().getTime,
    };
  }
  const message = new Message({ sender: user._id, room: user.lastRoom, message: text });
  await message.save();
  return message;
};

module.exports = { generateMessage };
