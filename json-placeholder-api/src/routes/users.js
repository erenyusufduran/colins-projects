const express = require("express");
const axios = require("axios");

const router = express.Router();

router.get("/", async (req, res) => {
  const response = await axios({
    method: "get",
    url: "https://jsonplaceholder.typicode.com/users",
  });
  res.send(response.data);
});
module.exports = router;
