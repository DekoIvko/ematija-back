const express = require("express");
const bodyParser = require("body-parser");
const verifyJWT = require("../../middleware/verifyAuth");

// controllers
const get_users = require("../../controllers/users/get_users");
const get_users_messengers = require("../../controllers/users/get_users_messengers");

module.exports = () => {
  const app = express.Router();
  app.use(bodyParser.json()); //  application/json
  app.use(bodyParser.urlencoded({ extended: true })); // application/x-www-form-urlencoded

  app.get("/", verifyJWT, (req, res) => {
    get_users.ServiceCall(req, res);
  });

  app.get("/messenger", verifyJWT, (req, res) => {
    get_users_messengers.ServiceCall(req, res);
  });

  return app;
};
