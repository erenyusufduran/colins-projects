const express = require("express");
const axios = require("axios");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const response = await axios({
      method: "get",
      url: "https://jsonplaceholder.typicode.com/albums",
    });
    res.send(response.data);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const response = await axios({
      method: "get",
      url: `https://jsonplaceholder.typicode.com/albums/${id}`,
    });
    res.send(response.data);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

router.post("/", async (req, res) => {
  try {
    const response = await axios({
      method: "post",
      url: `https://jsonplaceholder.typicode.com/albums/`,
      data: {
        userId: 1,
        title: req.body.title,
      },
    });
    res.send(response.data);
  } catch (error) {
    res.status(404).send(error);
  }
});

router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const response = await axios({
      method: "patch",
      url: `https://jsonplaceholder.typicode.com/albums/${id}`,
      data: {
        title: req.body.title,
      },
    });
    res.send(response.data);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

module.exports = router;
