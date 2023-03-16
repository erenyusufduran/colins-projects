const mongoose = require("mongoose");

const SupporterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
    unique: true,
  },
  // isChoosable is a boolean value for mod can be selected or not.
  // every 4th sprint, assigning to true.
  isChoosable: {
    type: Boolean,
    default: true,
  },
  // selectedSprint is include for last selected sprint.
  // Mods can not select, if he/she selected last sprint
  selectedSprint: {
    type: Number,
    default: -3,
  },
});

const Supporter = mongoose.model("Supporter", SupporterSchema);

module.exports = Supporter;
