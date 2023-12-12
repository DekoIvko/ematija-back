const Product = require("../../model/ProductSchema");

const get_products = function (req, res) {
  return new Promise(async function (resolve, reject) {
    try {
      const newProduct = await Product.create({
        email: email,
        password: hashedPassword,
        firstName: firstName,
        lastName: lastName,
        image: image,
      });

      resolve({ message: "Successfully add product!", data: newProduct, status: 200 });
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
