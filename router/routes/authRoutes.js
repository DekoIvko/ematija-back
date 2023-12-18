const express = require("express");
const bodyParser = require("body-parser");

// controllers
const get_refreshToken = require("../../controllers/auth/refreshTokenController");
const get_accessToken = require("../../controllers/auth/accessTokenController");

module.exports = () => {
  const app = express.Router();
  app.use(bodyParser.json()); // for parsing application/json
  app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

  app.get("/refresh", (req, res) => {
    get_refreshToken.handleRefreshToken(req, res);
  });

  app.get("/access", (req, res) => {
    get_accessToken.handleAccessToken(req, res);
  });

  return app;
};
