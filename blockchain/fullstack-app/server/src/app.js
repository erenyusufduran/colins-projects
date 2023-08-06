const express = require("express");
require("./db/mongoose");
require("./services");

const numberRouter = require("./routes/number");

const app = express();

app.use(express.json());
app.use("/number", numberRouter);

module.exports = app;
