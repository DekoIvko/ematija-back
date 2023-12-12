const express = require("express");
const app = express();
const cors = require("cors");
const credentials = require("./middleware/credentials");
const cookieParser = require("cookie-parser");
const routers = require("./router/index");
const corsOptions = require("./config/corsOptions");

app.use(
  express.json({
    limit: "10mb",
  })
);

app.use(
  express.urlencoded({
    limit: "10mb",
    parameterLimit: 5000,
    extended: false,
  })
);

app.use(function (req, res, next) {
  // Request methods you wish to allow
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE, HEAD");

  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Cache-Control, Expires,  Access-Control-Allow-Methods, Authorization"
  );

  next();
});

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

// middleware for cookies
app.use(cookieParser());

//Setup Routes
routers(app);

// error handler
app.use(function (err, req, res, next) {
  res.json({ error: err });

  res.locals.message = err.message;
  res.locals.error = err;

  // render the error page
  res.status(err.status || 500);
  res.json("error");
});

module.exports = app;
