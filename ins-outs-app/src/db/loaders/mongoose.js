const mongoose = require("mongoose");
require("dotenv").config();

mongoose
  .connect("mongodb://localhost:27017/ins-outs-app", {})
  .then(() => console.log("Connected"))
  .catch((e) => console.log(e));
