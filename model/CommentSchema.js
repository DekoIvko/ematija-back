const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  id: Number,
  postId: Number,
  title: String,
  body: String,
  user: {
    id: Number,
    username: String,
  },
  tags: [],
  reactions: [],
});

module.exports = mongoose.model("Comment", commentSchema);
