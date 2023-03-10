const express = require("express");
require("./src/db/mongodb");
const { cronMethod } = require("./src/scheduler");

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  try {
    cronMethod.start();
    res.send("Cron started.");
  } catch (error) {
    console.log(error);
    res.send({ error: "Something went wrong!" });
  }
});

app.listen(PORT, () => console.log(`Server is listening on PORT ${PORT}`));
