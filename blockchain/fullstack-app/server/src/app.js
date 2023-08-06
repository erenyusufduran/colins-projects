const express = require("express");
require("./db/mongoose");
require("./services");
const { incrementBy, getNumber } = require("./controllers");

const app = express();

app.use(express.json());

app.get("/", async (req, res) => {
  await incrementBy("0x333A2399f8b7d898d8F20F53AD725455F679845D", 500);
  const number = await getNumber();
  res.send({ number: number.toString() });
});

module.exports = app;
