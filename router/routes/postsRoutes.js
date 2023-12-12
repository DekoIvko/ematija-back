const express = require("express");
const bodyParser = require("body-parser");
const verifyJWT = require("../../middleware/verifyAuth");

// controllers
const get_posts = require("../../controllers/posts/get_posts");
const add_feed = require("../../controllers/posts/add_post");

module.exports = () => {
  const app = express.Router();
  app.use(bodyParser.json()); // for parsing application/json
  app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

  app.get("/", verifyJWT, (req, res) => {
    get_posts.ServiceCall(req, res);
  });

  app.post("/add", verifyJWT, (req, res) => {
    add_feed.ServiceCall(req, res);
  });

  return app;
};
