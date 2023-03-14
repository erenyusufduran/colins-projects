const http = require("http");
const socketio = require("socket.io");
const app = require("./app");

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);
const io = socketio(server);

io.on("connection", (socket) => {
  console.log("Web Socket connection.");
});

server.listen(PORT, () => console.log("Server is listening on port", PORT));
