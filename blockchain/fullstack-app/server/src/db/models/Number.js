const mongoose = require("mongoose");

const NumberSchema = new mongoose.Schema({
  address: {
    type: String,
    required: true,
  },
  number: {
    type: Number,
    required: true,
  },
});

const NumberModel = mongoose.model("Number", NumberSchema);

module.exports = NumberModel;
