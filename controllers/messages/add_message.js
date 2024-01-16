const Message = require("../../model/MessageSchema");

const add_message = function (req, res) {
  return new Promise(async function (resolve, reject) {
    try {
      const messages = await Message.find({}).exec();
      const newMessage = await Message.create({ ...req.body, id: messages.length++ });

      resolve(newMessage);
    } catch (err) {
      reject(err.toString());
    }
  });
};

module.exports = {
  ServiceCall: async function (req, res) {
    try {
      const message = await add_message(req, res);
      res.type("application/json").status(200).send(message);
    } catch (err) {
      res.type("application/json").status(500).send(err);
    }
  },
};
