const { Router } = require("express");
const axios = require("axios");
const clientsRouter = new Router();
const validate = require("../middlewares/validate");

clientsRouter.get("/", async (req, res) => {
  try {
    const response = await axios({
      method: "get",
      url: "http://localhost:3000/clients",
    });
    res.send(response.data);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

clientsRouter.get("/:id", async (req, res) => {
  try {
    const response = await axios({
      method: "get",
      params: {
        id: req.params.id,
      },
      url: "http://localhost:3000/clients",
    });
    res.send(response.data);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

clientsRouter.post("/", validate, async (req, res) => {
  try {
    const response = await axios({
      method: "post",
      url: "http://localhost:3000/clients",
      data: req.body,
    });
    res.status(201).send(response.data);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = clientsRouter;
