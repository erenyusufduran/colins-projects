const express = require("express");
const transactionRouter = require("./transactions");
const router = new express.Router();

router.use("/transactions", transactionRouter);

module.exports = router;
