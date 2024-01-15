require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("./config/dbConn");
const app = require("./app");
const io = require("./socket");

// connect to MongoDB
connectDB();

// for test running
app.get("/", (req, res) => {
  res.send("app is running");
  // for test
});

// for test sockets running
io.on("connection", (socket) => {
  console.log(`Sockets is running ${socket.id}`);
  io.on("notifications", (data) => {
    console.log(data);
  });
});

app.all("*", (req, res) => {
  res.status(404);
});

const PORT = process.env.PORT || 8000;
mongoose.connection.once("open", () => {
  app.listen(PORT, console.log(`server is running in port: ${PORT}`));
});
