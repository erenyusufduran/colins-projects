const mongoose = require("mongoose");

const AccountSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  balance: {
    type: Number,
    default: 0,
  },
});

const Account = mongoose.model("Account", AccountSchema);

module.exports = Account;
