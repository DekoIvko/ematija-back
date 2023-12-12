const express = require("express");
const bodyParser = require("body-parser");

// controllers
const get_refreshToken = require("../../controllers/refreshTokenController");

module.exports = () => {
  const app = express.Router();
  app.use(bodyParser.json()); // for parsing application/json
  app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
  app.get("/", (req, res) => {
    get_refreshToken.handleRefreshToken(req, res);
  });

  return app;
};
