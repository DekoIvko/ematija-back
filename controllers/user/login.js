const User = require("../../model/UserSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const login = function (req, res) {
  return new Promise(async function (resolve, reject) {
    try {
      const { email, password } = req?.body;
      if (!email || !password) {
        // resolve({ message: "Email and password required!", status: 400 }); // 400 bed request
        res.type("application/json").status(400).send({ message: "Email and password required!" });
      }
      const foundUser = await User.findOne({ email: email }).exec();

      if (foundUser?.email) {
        const matchPasswords = await bcrypt.compare(password, foundUser?.password);

        if (!matchPasswords) {
          res.type("application/json").status(400).send({ message: "Invalid password!" });
        } else {
          const accessToken = jwt.sign({ username: email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "2h" });
          const refreshToken = jwt.sign({ username: email }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "1d" });
          foundUser.refreshToken = refreshToken;

          const result = await foundUser.save();

          // Creates Secure Cookie with refresh token
          res.cookie("jwt", refreshToken, { httpOnly: true, sameSite: "None", secure: true, maxAge: 24 * 60 * 60 * 1000 }); // jwt refresh token 24 hours
          const data = {
            id: result.id,
            email: result.email,
            username: result.username,
            firstName: result.firstName,
            lastName: result.lastName,
            birthDate: result.birthDate,
            gender: result.gender,
            image: result.image,
            accessToken,
          };

          resolve({ message: "Successfully Sign In", data, status: 200 });
        }
      } else {
        resolve({ message: "Invalid email or password", status: 400 });
      }
    } catch (err) {
      reject(err.toString());
    }
  });
};

module.exports = {
  ServiceCall: async function (req, res) {
    try {
      const loginConfirm = await login(req, res);
      res.type("application/json").status(200).send(loginConfirm);
    } catch (err) {
      res.type("application/json").status(500).send(err);
    }
  },
};
