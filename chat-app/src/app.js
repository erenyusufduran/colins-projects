const express = require("express");
require("./db/mongodb");
const userRouter = require("./routers/user");

const app = express();

app.use(express.json());
app.use("/users", userRouter);

module.exports = app;
