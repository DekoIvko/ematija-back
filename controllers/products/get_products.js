const Product = require("../../model/ProductSchema");

const get_products = function (req, res) {
  return new Promise(async function (resolve, reject) {
    try {
      const products = await Product.find({}).exec();
      if (products) resolve(products);
    } catch (err) {
      reject(err.toString());
    }
  });
};

module.exports = {
  ServiceCall: async function (req, res) {
    try {
      const products = await get_products(req, res);
      res.type("application/json").status(200).send(products);
    } catch (err) {
      res.type("application/json").status(500).send(err);
    }
  },
};
