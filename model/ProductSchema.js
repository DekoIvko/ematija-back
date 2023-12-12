const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  id: Number,
  title: String,
  description: String,
  price: Number,
  discountPercentage: Number,
  rating: Number,
  stock: Number,
  brand: String,
  category: String,
  thumbnail: String,
  images: [],
});

module.exports = mongoose.model("Product", productSchema);
