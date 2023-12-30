const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
  _id: String,
  id: Number,
  title: String,
  body: String,
  userId: Number,
  tags: [],
  reactions: [],
});

module.exports = mongoose.model("Post", postSchema);
