const express = require("express");
const bodyParser = require("body-parser");
const verifyJWT = require("../../middleware/verifyAuth");

// controllers
const get_messages = require("../../controllers/messages/get_messages");
const add_message = require("../../controllers/messages/add_message");
const check_chat = require("../../controllers/messages/check_chat");

module.exports = () => {
  const app = express.Router();
  app.use(bodyParser.json()); // for parsing application/json
  app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

  app.get("/", verifyJWT, (req, res) => {
    get_messages.ServiceCall(req, res);
  });

  app.post("/add", verifyJWT, (req, res) => {
    add_message.ServiceCall(req, res);
  });

  app.post("/chat", verifyJWT, (req, res) => {
    check_chat.ServiceCall(req, res);
  });

  return app;
};
