const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const { rooms, addUser } = require("./utils/users");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const PORT = process.env.PORT || 3000;

app.set("views", "./views");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index", { rooms });
});

app.post("/room", (req, res) => {
  if (rooms[req.body.room] !== undefined) {
    return res.redirect("/");
  }
  rooms[req.body.room] = { users: [], count: 0 };
  res.redirect(req.body.room);
});

app.get("/:room", (req, res) => {
  if (rooms[req.params.room] === undefined) {
    return res.redirect("/");
  }
  res.render("room", { roomName: req.params.room });
});

io.on("connection", (socket) => {
  console.log("Websocket Connection");

  socket.on("join", ({ username, _id }, room) => {
    addUser({ id: _id, username, room });
    socket.join(room);
    socket.emit("message", { username, _id, room });
  });
});

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
