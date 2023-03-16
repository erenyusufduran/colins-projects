const express = require("express");
require("./db/loaders/mongoose");
const { cronMethod } = require("./scheduler/scheduler");

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
cronMethod.start();

app.get("/", (req, res) => {
  res.send("Cron started");
});

app.listen(PORT, () => console.log(`Server is listening on PORT ${PORT}`));
