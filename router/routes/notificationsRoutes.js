const express = require("express");
const bodyParser = require("body-parser");
const verifyJWT = require("../../middleware/verifyAuth");

// controllers
const add_notification = require("../../controllers/notifications/add_notification");
const get_notifications = require("../../controllers/notifications/get_notifications");

module.exports = () => {
  const app = express.Router();
  app.use(bodyParser.json()); // for parsing application/json
  app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

  app.get("/", verifyJWT, (req, res) => {
    get_notifications.ServiceCall(req, res);
  });

  app.get("/add", verifyJWT, (req, res) => {
    add_notification.ServiceCall(req, res);
  });

  return app;
};
