const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messageSchema = new Schema({
  id: Number,
  chatId: Number,
  senderId: Number,
  timestamp: String,
  text: String,
});

module.exports = mongoose.model("Message", messageSchema);
