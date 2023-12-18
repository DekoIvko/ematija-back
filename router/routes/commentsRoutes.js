const express = require("express");
const bodyParser = require("body-parser");
const verifyJWT = require("../../middleware/verifyAuth");

// controllers
const get_comments = require("../../controllers/comments/get_comments");

module.exports = () => {
  const app = express.Router();
  app.use(bodyParser.json()); // for parsing application/json
  app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

  app.get("/", verifyJWT, (req, res) => {
    get_comments.ServiceCall(req, res);
  });

  //   app.post("/add", verifyJWT, (req, res) => {
  //     add_comments.ServiceCall(req, res);
  //   });

  return app;
};
