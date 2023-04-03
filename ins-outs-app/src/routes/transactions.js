const express = require("express");
const router = new express.Router();
const { accountsToDB, transactionsToDB } = require("../db/loaders/migrations");
const Transaction = require("../db/models/transactions");

router.get("/", async (req, res) => {
  const transactions = await Transaction.find({}).sort({ date: -1 });
  res.send({ transactions });
});

router.get("/init", async (req, res) => {
  await accountsToDB();
  await transactionsToDB();

  res.send("Initialized!");
});

module.exports = router;
