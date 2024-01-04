const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const todoSchema = new Schema({
  id: Number,
  todo: String,
  completed: Boolean,
  userId: Number,
});

module.exports = mongoose.model("Todo", todoSchema);
