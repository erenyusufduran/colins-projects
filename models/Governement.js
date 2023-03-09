const mongoose = require("mongoose");

const governementSchema = new mongoose.Schema({
  skipWeek: {
    type: Boolean,
    default: false,
  },
  sprintCount: {
    type: Number,
    default: 0,
  },
});

const Governement = mongoose.model("Governement", governementSchema);

module.exports = Governement;
