const express = require("express");
const bodyParser = require("body-parser");

// controllers
const get_users = require("../../controllers/users/get_users");

module.exports = () => {
  const app = express.Router();
  app.use(bodyParser.json()); //  application/json
  app.use(bodyParser.urlencoded({ extended: true })); // application/x-www-form-urlencoded

  app.get("/", (req, res) => {
    get_users.ServiceCall(req, res);
  });

  return app;
};
