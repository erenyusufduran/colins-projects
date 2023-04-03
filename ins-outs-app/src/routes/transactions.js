const express = require("express");
const router = new express.Router();
const { transactionsToDB } = require("../db/loaders/migrations");

router.get("/", async (req, res) => {
  await transactionsToDB();
  res.send("Sent");
});

router.get("/eren", async (req, res) => {
  res.send("ERERE");
});

module.exports = router;
