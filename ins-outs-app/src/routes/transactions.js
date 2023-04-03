const express = require("express");
const router = new express.Router();
const { accountsToDB, transactionsToDB } = require("../db/loaders/migrations");
const Transaction = require("../db/models/transactions");

router.get("/", async (req, res) => {
  const match = {};
  if (req.query.beginDate) {
    match.beginDate = req.query.beginDate;
  }
  if (req.query.endDate) {
    match.endDate = req.query.endDate;
  }

  const transactions = await Transaction.find({
    date: {
      $gte: req.query.beginDate ? new Date(req.query.beginDate) : new Date(0),
      $lt: req.query.endDate ? new Date(req.query.endDate) : new Date(),
    },
  }).sort({ date: -1 });
  res.send({ transactions });
});

router.get("/:accountId", async (req, res) => {
  const transactions = await Transaction.find({ account: req.params.accountId }).sort({ date: -1 });
  res.send({ transactions });
});

router.get("/init", async (req, res) => {
  await accountsToDB();
  await transactionsToDB();

  res.send("Initialized!");
});

module.exports = router;
