const User = require("../../model/UserSchema");
const bcrypt = require("bcrypt");

const register = function (req, res) {
  return new Promise(async function (resolve, reject) {
    try {
      const { firstName, lastName, email, image, password } = req?.body;
      const foundUser = await User.findOne({ email: email }).exec();

      if (foundUser && foundUser.email) {
        resolve({ message: "User already exist!", data: {}, status: 409 }); // 409 conflicts
      } else {
        // encrypt the password
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({
          email: email,
          password: hashedPassword,
          firstName: firstName,
          lastName: lastName,
          image: image,
        });

        resolve({ message: "Successfully register", data: {}, status: 200 });
      }
    } catch (err) {
      reject(err.toString());
    }
  });
};

module.exports = {
  ServiceCall: async function (req, res) {
    try {
      const registerConfirm = await register(req, res);
      res.type("application/json").status(200).send(registerConfirm);
    } catch (err) {
      res.type("application/json").status(500).send(err);
    }
  },
};
