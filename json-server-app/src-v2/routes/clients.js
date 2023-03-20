const { Router } = require("express");
const axios = require("axios");
const clientsRouter = new Router();
const validate = require("../middlewares/validate");

clientsRouter.get("/", async (req, res) => {
  try {
    const response = await axios({
      method: "get",
      url: "http://localhost:3000/clients?isActive=true",
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

clientsRouter.patch("/:id", validate, async (req, res) => {
  try {
    const response = await axios({
      method: "patch",
      url: `http://localhost:3000/clients/${req.params.id}`,
      data: req.body,
    });
    res.status(200).send(response.data);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

clientsRouter.delete("/:id", validate, async (req, res) => {
  try {
    await axios({
      method: "delete",
      url: `http://localhost:3000/clients/${req.params.id}`,
    });
    res.status(200).send("Client deleted");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = clientsRouter;
