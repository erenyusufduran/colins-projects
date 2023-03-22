const express = require("express");
const getRoomsRouter = require("./api/getRooms");

const router = new express.Router();

router.use("/api", getRoomsRouter);

module.exports = router;
