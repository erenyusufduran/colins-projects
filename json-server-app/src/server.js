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
    } else if (req.method === "GET") {
      if (!req.query.isActive) {
        let redirectUrl = req.originalUrl;
        if (req.query === {}) {
          redirectUrl += "?isActive=true";
        } else {
          redirectUrl += "&isActive=true";
        }
        return res.redirect(redirectUrl);
      }
      next();
    }
  },
  router
);

server.listen(4000, () => console.log("JSON Server is running."));
