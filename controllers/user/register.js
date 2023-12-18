const User = require("../../model/UserSchema");
const bcrypt = require("bcrypt");

const register = function (req, res) {
  return new Promise(async function (resolve, reject) {
    try {
      const { username, firstName, lastName, email, image, birthDate, gender, password } = req?.body;
      const foundUser = await User.findOne({ email: email }).exec();
      const counterUsers = await User.find({}).exec();

      if (email.toLowerCase() === foundUser?.email.toLowerCase()) {
        res.type("application/json").status(409).send({ message: "User already exist!" });
      } else {
        // encrypt the password
        const hashedPassword = await bcrypt.hash(password, 10);
        // add user to database
        await User.create({
          id: counterUsers.length++,
          username: username,
          email: email,
          password: hashedPassword,
          firstName: firstName,
          lastName: lastName,
          birthDate: birthDate,
          gender: gender,
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
