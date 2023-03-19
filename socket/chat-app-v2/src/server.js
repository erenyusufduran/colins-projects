const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const ejs = require("ejs");
const { rooms, addUser, removeUser } = require("./utils/users");

require("./db/mongoose");

const Room = require("./db/models/room");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const PORT = process.env.PORT || 3000;

app.set("views", "./views");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

let ejsOptions = {
  async: true,
};

app.engine("ejs", async (path, data, cb) => {
  try {
    let html = await ejs.renderFile(path, data, ejsOptions);
    cb(null, html);
  } catch (error) {
    cb(error, "");
  }
});

const stardardResponse = (err, html, res) => {
  if (err) {
    console.log(err);
    return res.status(500).render("index", { page: 500, error: err });
  } else {
    return res.status(200).send({ rooms: html.rooms });
  }
};

app.get("/", (req, res) => {
  res.render("index", { rooms }, (err, html) => stardardResponse(err, html, res));
});

app.post("/room", async (req, res) => {
  const room = new Room(req.body);
  try {
    await room.save();
    res.redirect(room.name);
  } catch (error) {
    console.log(error.message);
    res.redirect("/");
  }
});

app.get("/:room", (req, res) => {
  const room = Room.findOne({ name: req.params.room });
  if (!room) {
    return res.redirect("/");
  }
  res.render("room", { room: req.name });
});

io.on("connection", (socket) => {
  console.log("Websocket Connection");

  socket.on("join", ({ username }, room) => {
    addUser({ id: socket.id, username, room });
    socket.join(room);
    socket.emit("message", username);
  });

  socket.on("disconnect", () => {
    removeUser(socket.id);
  });
});

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
