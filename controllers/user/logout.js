const User = require("../../model/UserSchema");

const logout = function (req, res) {
  return new Promise(async function (resolve, reject) {
    try {
      const cookies = req.cookies;
      if (!cookies?.jwt) return res.sendStatus(204); // No content
      const refreshToken = cookies.jwt;

      const foundUser = await User.findOne({ refreshToken }).exec();
      if (!foundUser) {
        res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
        return res.sendStatus(204);
      }
      foundUser.refreshToken = "";
      const result = await foundUser.save();

      res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
      res.sendStatus(204);

      console.log(result);
      resolve({ message: "ke vidime sto ke stoi tuka", data: result, status: 200 });
    } catch (err) {
      reject(err.toString());
    }
  });
};

module.exports = {
  ServiceCall: async function (req, res) {
    try {
      const logoutConfirm = await logout(req, res);
      res.type("application/json").status(200).send(logoutConfirm);
    } catch (err) {
      res.type("application/json").status(500).send(err);
    }
  },
};
