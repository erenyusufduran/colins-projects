const express = require("express");
const Room = require("../models/room");
const router = express.Router();

router.post("/", async (req, res) => {
  const room = await Room.findOne({ name: req.body.name });
  if (room) return res.status(400).send({ error: "Room already exists!" });
  const newRoom = new Room({ name: req.body.name });
  await newRoom.save();
  res.send(newRoom);
});

router.get("/", async (req, res) => {
  const rooms = await Room.find({});
  res.send(rooms);
});

module.exports = router;
