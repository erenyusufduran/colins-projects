const express = require("express");
require("./db/mongodb");
const userRouter = require("./routers/user");
const roomRouter = require("./routers/room");

const app = express();

app.use(express.json());
app.use("/users", userRouter);
app.use("/rooms", roomRouter);

module.exports = app;
