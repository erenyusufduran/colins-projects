const express = require("express");
const router = new express.Router();
const Account = require("../db/models/accounts");
const Transaction = require("../db/models/transactions");

router.get("/", async (req, res) => {
  const accounts = await Account.find({ isDeleted: false }).sort({ date: -1 });
  res.send({ accounts });
});

router.get("/:accountId", async (req, res) => {
  const transactions = await Transaction.find({ account: req.params.accountId }).sort({ date: -1 });
  res.send({ transactions });
});

router.post("/", async (req, res) => {
  const { name } = req.body;
  const account = new Account({ name });
  try {
    await account.save();
    res.status(201).send({ account });
  } catch (error) {
    res.status(500).send({ error: "Something went wrong!" });
  }
});

router.patch("/:id", async (req, res) => {
  const { balance } = req.body;
  try {
    const account = await Account.findById(req.params.id);
    account.balance = balance;
    await account.save();
    res.status(201).send({ account });
  } catch (error) {
    res.status(500).send({ error: "Something went wrong!" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Account.findByIdAndUpdate(req.params.id, { isDeleted: true });
    res.status(200).send({ account: "Account is deleted" });
  } catch (error) {
    res.status(500).send({ error: "Something went wrong!" });
  }
});

module.exports = router;
