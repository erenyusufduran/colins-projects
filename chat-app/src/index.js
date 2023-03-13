const path = require("path");
const http = require("http");
const express = require("express");
const socketio = require("socket.io");

const PORT = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const publicDirectoryPath = path.join(__dirname, "../public");

app.use(express.static(publicDirectoryPath));

io.on("connection", (socket) => {
  console.log("Websocket connection.");

  socket.on("disconnect", () => {
    console.log("Disconnected");
  });
});

server.listen(PORT, () => `Server is listening on port ${PORT}`);
