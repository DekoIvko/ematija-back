const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyJWT = async (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.sendStatus(401);
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.sendStatus(403); // invalid token
    req.email = decoded.email;
    next();
  });
};

module.exports = verifyJWT;
