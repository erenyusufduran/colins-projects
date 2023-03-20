const { Router } = require("express");
const clientsRouter = require("./clients");

const router = new Router();

router.use("/clients", clientsRouter);

module.exports = router;
