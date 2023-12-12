const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // mongodb connection
    mongoose
      .connect(process.env.MONGODB_URL, {
        // useUnifiedTopology: true,
        // useNewUrlParser: true,
      })
      .then(() => console.log("Connect to mongoose Database"))
      .catch((err) => console.log(err));
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB;
