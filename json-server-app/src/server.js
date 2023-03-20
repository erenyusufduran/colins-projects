const jsonServer = require("json-server");
const express = require("express");
const validate = require("./middlewares/validate");

jsonServer.create();

const server = express();
const router = jsonServer.router("src/db/db.json");

server.use(jsonServer.bodyParser);

server.use(
  "/api",
  (req, res, next) => {
    if (req.method === "POST") {
      validate(req, res, next);
    }
  },
  router
);

server.listen(4000, () => console.log("JSON Server is running."));
