const express = require("express");
const axios = require("axios");

const router = express.Router();

router.get("/", async (req, res) => {
  const response = await axios({
    method: "get",
    url: "https://jsonplaceholder.typicode.com/posts/",
  });
  res.send(response.data);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const response = await axios({
      method: "get",
      url: `https://jsonplaceholder.typicode.com/posts/${id}`,
    });
    res.send(response.data);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

router.get("/:id/comments", async (req, res) => {
  const { id } = req.params;
  try {
    const response = await axios({
      method: "get",
      url: `https://jsonplaceholder.typicode.com/posts/${id}/comments`,
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
      url: `https://jsonplaceholder.typicode.com/posts/`,
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

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const response = await axios({
      method: "put",
      url: `https://jsonplaceholder.typicode.com/posts/${id}`,
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

module.exports = router;
