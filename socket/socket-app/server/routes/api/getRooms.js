const express = require("express");
const Room = require("../../db/models/room");

const router = new express.Router();

router.get("/rooms", async (req, res) => {
  try {
    const rooms = await Room.find({});
    res.send(rooms);
  } catch {
    res.status(500).send("Error when fetching rooms.");
  }
});

module.exports = router;
