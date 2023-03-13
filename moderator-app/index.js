const express = require("express");
require("./src/db/mongodb");
const { cronMethod } = require("./src/scheduler");

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
cronMethod.start();

app.get("/", (req, res) => {
  res.send("Cron started");
});

app.listen(PORT, () => console.log(`Server is listening on PORT ${PORT}`));
