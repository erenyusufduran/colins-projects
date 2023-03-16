const mongoose = require("mongoose");

const ManagementSchema = new mongoose.Schema({
  // our scheduler works every monday, but our sprints are 2 weeks.
  // so I use a boolean for skip weeks.
  skipWeek: {
    type: Boolean,
    default: false,
  },
  // this holds our sprint counts.
  sprintCount: {
    type: Number,
    default: 0,
  },
});

const Management = mongoose.model("Management", ManagementSchema);

module.exports = Management;
