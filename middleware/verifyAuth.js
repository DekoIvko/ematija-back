const jwt = require("jsonwebtoken");
// const { handleRefreshToken } = require("../controllers/auth/refreshTokenController");
require("dotenv").config();

const verifyJWT = async (req, res, next) => {
  const access_token = req.header("Authorization");
  // const refresh_token = req?.cookies?.jwt;
  console.log("verifyJWT verifyJWT  verifyJWT");
  if (!access_token) return res.sendStatus(401);
  jwt.verify(access_token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    console.log("decoded ", decoded);
    if (err) {
      console.log("errrrrr ", err);
      return res.sendStatus(403); // invalid token
    }

    console.log("decoded ", decoded);
    if (Date.now() > decoded?.exp * 1000) {
      //   const new_access_token = handleRefreshToken(req, res);
      //   verifyJWT();
      console.log("its expired");
    }

    req.email = decoded.email;
    next();
  });
};

module.exports = verifyJWT;
