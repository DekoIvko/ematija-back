const express = require("express");
const bodyParser = require("body-parser");
const verifyJWT = require("../../middleware/verifyAuth");

// controllers
const get_todos = require("../../controllers/todos/get_todos");

module.exports = () => {
  const app = express.Router();
  app.use(bodyParser.json()); // for parsing application/json
  app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

  app.get("/", verifyJWT, (req, res) => {
    get_todos.ServiceCall(req, res);
  });

  // app.get("/add", verifyJWT, (req, res) => {
  //   add_todos.ServiceCall(req, res);
  // });

  return app;
};
