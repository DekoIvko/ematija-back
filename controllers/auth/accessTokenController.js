const jwt = require("jsonwebtoken");

const handleAccessToken = async (req, res) => {
  const cookies = req?.cookies;
  if (!cookies?.jwt) return res.sendStatus(401);
  const accessToken = cookies.jwt;
  console.log("accessToken ", accessToken);
  if (!accessToken) return res.sendStatus(403); // forbidden
  console.log("accessToken 2 ", accessToken);

  // evaluate jwt
  jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    console.log("err", err);
    if (err || foundUser.email !== decoded.username) return res.sendStatus(403);
    console.log("decoded", decoded);
    res.json({ accessToken });
  });
};

module.exports = { handleAccessToken };
