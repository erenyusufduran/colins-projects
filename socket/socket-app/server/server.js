require("dotenv").config();
require("./db/mongoose");
const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const Message = require("./db/models/message");
const Room = require("./db/models/room");
const router = require("./routes");

const PORT = process.env.PORT || 4000;
const app = express();

app.use(cors());
app.use(router);

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

const CHAT_BOT = "ChatBot";

let chatRoom = "";
let allUsers = [];

io.on("connection", (socket) => {
  console.log(`User connected ${socket.id}`);

  socket.on("join_room", async (data) => {
    const { username } = data;
    let { room } = data;
    const dbRoom = await Room.findOne({ name: room });
    if (!dbRoom) {
      room = new Room({ name: room });
      await room.save();
      room = room.name;
    }
    socket.join(room);

    let createdAt = Date.now();
    socket.to(room).emit("receive_message", {
      message: `Welcome ${username}`,
      username: CHAT_BOT,
      createdAt,
    });

    chatRoom = room;
    allUsers.push({ id: socket.id, username, room });
    chatRoomUsers = allUsers.filter((user) => user.room === room);
    socket.to(room).emit("chatroom_users", chatRoomUsers);
    socket.emit("chatroom_users", chatRoomUsers);

    const dbMessages = await Message.find({ room: room }).limit(100);
    socket.emit("last_100_messages", dbMessages);
  });

  socket.on("send_message", async (data) => {
    const { message, username, room } = data;
    io.in(room).emit("receive_message", data);
    const dbMessage = new Message({ message, username, room });
    await dbMessage.save();
  });

  socket.on("leave_room", (data) => {
    const { username, room } = data;

    socket.leave(room);
    const createdAt = Date.now();

    allUsers = allUsers.filter((user) => user.id !== socket.id);
    socket.to(room).emit("chatroom_users", allUsers);
    socket.to(room).emit("receive_message", {
      username: CHAT_BOT,
      message: `${username} has left the chat`,
      createdAt,
    });
  });

  socket.on("disconnect", () => {
    const user = allUsers.find((user) => user.id === socket.id);
    if (user?.username) {
      const createdAt = Date.now();
      allUsers = allUsers.filter((user) => user.id !== socket.id);
      socket.to(chatRoom).emit("chatroom_users", allUsers);
      socket.to(chatRoom).emit("receive_message", {
        username: CHAT_BOT,
        message: `${user.username} has disconnected from the chat`,
        createdAt,
      });
    }
  });
});

server.listen(PORT, () => `Server is running on port ${PORT}`);
