const mongoose = require("mongoose");

const AccountSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    trim: true,
  },
  balance: {
    type: Number,
    default: 0,
  },
});

const Account = mongoose.model("Account", AccountSchema);

module.exports = Account;
