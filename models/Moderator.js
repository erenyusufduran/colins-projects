const mongoose = require("mongoose");

const moderatorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
    unique: true,
  },
  isChoosable: {
    type: Boolean,
    default: true,
  },
  selectedSprint: {
    type: Number,
    default: -3,
  },
});

const Moderator = mongoose.model("Moderator", moderatorSchema);

module.exports = Moderator;
