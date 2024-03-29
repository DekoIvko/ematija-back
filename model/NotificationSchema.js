const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const notificationSchema = new Schema({
  id: Number,
  type: String,
  fromUserId: Number,
  toUserId: Number,
  timestamp: String,
  title: String,
  body: String,
});

module.exports = mongoose.model("Notification", notificationSchema);
