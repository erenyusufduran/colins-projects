const express = require("express");
const transactionRouter = require("./transactions");
const accountsRouter = require("./accounts");
const router = new express.Router();

router.use("/transactions", transactionRouter);
router.use("/accounts", accountsRouter);

module.exports = router;
