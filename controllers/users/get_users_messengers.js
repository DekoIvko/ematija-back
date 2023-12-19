const Users = require("../../model/UserSchema");

const get_users_messengers = function (req, res) {
  return new Promise(async function (resolve, reject) {
    try {
      const filter = req?.query?.filter;
      const users = await Users.find({}).exec();

      const filteredUsers = users?.filter((user) => {
        return user.firstName.toLowerCase().includes(filter.toLowerCase()) || user.lastName.toLowerCase().includes(filter.toLowerCase());
      });
      if (filteredUsers) {
        resolve(filteredUsers);
      } else {
        resolve([]);
      }
    } catch (err) {
      reject(err.toString());
    }
  });
};

module.exports = {
  ServiceCall: async function (req, res) {
    try {
      const users = await get_users_messengers(req, res);
      res.type("application/json").status(200).send(users);
    } catch (err) {
      res.type("application/json").status(500).send(err);
    }
  },
};
