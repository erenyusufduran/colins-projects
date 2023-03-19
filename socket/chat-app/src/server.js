const http = require("http");
const socketio = require("socket.io");
const app = require("./app");
const { generateMessage } = require("./utils/messages");
const { addUser } = require("./utils/users");

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);
const io = socketio(server);

io.on("connection", (socket) => {
  console.log("Web Socket connection.");

  socket.on("join", (options, callback) => {
    const user = addUser({ ...options });

    socket.join(user.lastRoom);
    socket.emit("message", generateMessage("Admin", "Welcome"));
    socket.broadcast.to(user.room).emit("message", generateMessage("Admin", `${user.username} has joined!`));
  });
});

server.listen(PORT, () => console.log("Server is listening on port", PORT));
