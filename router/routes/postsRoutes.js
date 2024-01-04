const express = require("express");
const bodyParser = require("body-parser");
const verifyJWT = require("../../middleware/verifyAuth");

// controllers
const get_posts = require("../../controllers/posts/get_posts");
const add_post = require("../../controllers/posts/add_post");
const remove_post = require("../../controllers/posts/remove_post");
const add_reaction = require("../../controllers/posts/add_reaction");

module.exports = () => {
  const app = express.Router();
  app.use(bodyParser.json()); // for parsing application/json
  app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

  app.get("/", verifyJWT, (req, res) => {
    get_posts.ServiceCall(req, res);
  });

  app.post("/add", verifyJWT, (req, res) => {
    add_post.ServiceCall(req, res);
  });

  app.get("/remove", verifyJWT, (req, res) => {
    remove_post.ServiceCall(req, res);
  });

  app.post("/add-reaction", verifyJWT, (req, res) => {
    add_reaction.ServiceCall(req, res);
  });

  return app;
};
