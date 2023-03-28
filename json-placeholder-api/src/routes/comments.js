const express = require("express");
const axios = require("axios");

const router = express.Router();

router.get("/", async (req, res) => {
  const { postId } = req.query;

  try {
    const response = await axios({
      method: "get",
      url: !postId
        ? "https://jsonplaceholder.typicode.com/comments/"
        : `https://jsonplaceholder.typicode.com/comments?postId=${postId}`,
    });
    res.send(response.data);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const response = await axios({
      method: "get",
      url: `https://jsonplaceholder.typicode.com/comments/${id}`,
    });
    res.send(response.data);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

module.exports = router;
