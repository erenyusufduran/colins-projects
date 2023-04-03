const mongoose = require("mongoose");

const AccountSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    trim: true,
    lowercase: true,
  },
  balance: {
    type: Number,
    default: 0,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

const Account = mongoose.model("Account", AccountSchema);

module.exports = Account;
