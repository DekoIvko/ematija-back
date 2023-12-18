const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  id: Number,
  title: String,
  body: String,
  userId: Number,
  tags: [],
  reactions: [],
});

module.exports = mongoose.model("Comment", commentSchema);
