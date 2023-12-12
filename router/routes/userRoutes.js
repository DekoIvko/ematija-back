const express = require("express");
const bodyParser = require("body-parser");

// controllers
const register = require("../../controllers/user/register");
const login = require("../../controllers/user/login");
const logout = require("../../controllers/user/logout");

module.exports = () => {
  const app = express.Router();
  app.use(bodyParser.json()); //  application/json
  app.use(bodyParser.urlencoded({ extended: true })); // application/x-www-form-urlencoded

  app.post("/register", (req, res) => {
    register.ServiceCall(req, res);
  });

  app.post("/login", (req, res) => {
    login.ServiceCall(req, res);
  });

  app.get("/login", (req, res) => {
    if (!req.session.user) {
      res.send({ loggedIn: false, user: req.session.user });
    } else {
      res.send({ loggedIn: false });
    }
  });

  app.post("/logout", (req, res) => {
    logout.ServiceCall(req, res);
  });

  return app;
};
