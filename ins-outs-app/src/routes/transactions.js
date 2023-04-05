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

router.get("/:id", async (req, res) => {
  const transaction = Transaction.findById(req.params.id);
  if (!transaction) return res.status(404).send({ error: "There is no transaction with this id." });
  return res.send({ transaction });
});

router.post("/", async (req, res) => {
  const transaction = new Transaction(req.body);
  try {
    await transaction.save();
    res.status(201).send({ transaction });
  } catch (error) {
    res.status(500).send({ error: "Something went wrong!" });
  }
});

router.patch("/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["date", "category", "parentCategory", "account", "type", "sum", "tag", "commentText"];
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update));
  if (!isValidOperation) return res.status(400).send({ error: "Invalid Updates!" });

  try {
    const transaction = await Task.findById(req.params.id);
    if (!transaction) return res.status(404).send({ error: "There is no transaction with this id." });
    updates.forEach((update) => (transaction[update] = req.body[update]));
    await transaction.save();
    res.send({ transaction });
  } catch (error) {
    res.status(500).send({ error: "Something went wrong!" });
  }
});

router.get("/init", async (req, res) => {
  await accountsToDB();
  await transactionsToDB();

  res.send("Initialized!");
});

module.exports = router;
