const express = require("express");
const bodyParser = require("body-parser");
const verifyJWT = require("../../middleware/verifyAuth");

// controllers
const get_products = require("../../controllers/products/get_products");
const add_products = require("../../controllers/products/add_product");

module.exports = () => {
  const app = express.Router();
  app.use(bodyParser.json()); //  application/json
  app.use(bodyParser.urlencoded({ extended: true })); // application/x-www-form-urlencoded

  app.get("/", verifyJWT, (req, res) => {
    get_products.ServiceCall(req, res);
  });

  app.get("/add", verifyJWT, (req, res) => {
    add_products.ServiceCall(req, res);
  });

  return app;
};
