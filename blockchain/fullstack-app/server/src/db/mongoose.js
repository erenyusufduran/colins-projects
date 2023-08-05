const mongoose = require("mongoose");

async function connectMongo() {
  await mongoose.connect("mongodb://localhost:27017/bchain");
}

module.exports = { connectMongo };
