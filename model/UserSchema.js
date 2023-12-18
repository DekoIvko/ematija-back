const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  id: {
    type: Number,
    unique: true,
  },
  firstName: String,
  lastName: String,
  email: {
    type: String,
    unique: true,
  },
  username: {
    type: String,
    unique: true,
  },
  password: String,
  gender: String,
  contact: {
    address: String,
    city: String,
    state: String,
    phone: String,
  },
  birthDate: String,
  image: String,
  refreshToken: String,
});

module.exports = mongoose.model("User", userSchema);
