require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("./config/dbConn");
const app = require("./app");
const http = require("http");
const server = http.createServer(app);
const socket = require("./socket");

// connect to MongoDB
connectDB();

// sockets running
socket(server);

// for test running
app.get("/", (req, res) => {
  res.send("app is running");
  // for test
});

app.all("*", (req, res) => {
  res.status(404);
});

const PORT = process.env.PORT || 8000;
mongoose.connection.once("open", () => {
  server.listen(PORT, console.log(`server is running in port: ${PORT}`));
});
