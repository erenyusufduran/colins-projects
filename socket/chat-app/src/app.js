const path = require("path");
const express = require("express");
require("./db/mongodb");
const userRouter = require("./routers/user");
const roomRouter = require("./routers/room");

const app = express();

const publicDirectoryPath = path.join(__dirname, "../public");

app.use(express.json());
app.use(express.static(publicDirectoryPath));
app.use("/api/users", userRouter);
app.use("/api/rooms", roomRouter);

module.exports = app;
