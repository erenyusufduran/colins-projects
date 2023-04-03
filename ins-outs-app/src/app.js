const express = require("express");
const router = require("./routes");
require("./db/loaders/mongoose");
const app = express();

app.use(express.json());
app.use("/api", router);

module.exports = app;
