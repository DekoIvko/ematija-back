const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const chatSchema = new Schema({
  id: Number,
  senderIdOne: Number,
  senderIdTwo: Number,
});

module.exports = mongoose.model("Chat", chatSchema);
