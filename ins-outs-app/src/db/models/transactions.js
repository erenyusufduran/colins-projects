const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  parentCategory: {
    type: String,
  },
  account: {
    type: mongoose.Types.ObjectId,
    ref: "Account",
  },
  type: {
    type: String,
    enum: ["expenses", "incomes"],
    default: "expenses",
  },
  sum: {
    type: Number,
    required: true,
    default: 0,
  },
  tag: {
    type: String,
  },
  commentText: {
    type: String,
    maxLength: 50,
  },
});

const Transaction = mongoose.models.Transaction || mongoose.model("Transaction", TransactionSchema);

module.exports = Transaction;
