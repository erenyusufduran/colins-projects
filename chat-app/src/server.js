const http = require("http");
const socketio = require("socket.io");
const app = require("./app");

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);
const io = socketio(server);

server.listen(PORT, () => console.log("Server is listening on port", PORT));
