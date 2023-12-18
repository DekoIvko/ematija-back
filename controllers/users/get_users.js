const Users = require("../../model/UserSchema");

const get_users = function (req, res) {
  return new Promise(async function (resolve, reject) {
    try {
      const users = await Users.find({}).exec();
      if (users) resolve(users);
    } catch (err) {
      reject(err.toString());
    }
  });
};

module.exports = {
  ServiceCall: async function (req, res) {
    try {
      const users = await get_users(req, res);
      res.type("application/json").status(200).send(users);
    } catch (err) {
      res.type("application/json").status(500).send(err);
    }
  },
};
