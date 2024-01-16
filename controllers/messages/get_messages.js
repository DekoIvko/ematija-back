const Message = require("../../model/MessageSchema");

const get_messages = function (req, res) {
  return new Promise(async function (resolve, reject) {
    try {
      const param = await req?.query?.id;
      const messages = param ? await Message.find({ chatId: parseInt(param) }).exec() : await Message.find({}).exec();
      if (messages) resolve(messages);
    } catch (err) {
      reject(err.toString());
    }
  });
};

module.exports = {
  ServiceCall: async function (req, res) {
    try {
      const messages = await get_messages(req, res);
      res.type("application/json").status(200).send(messages);
    } catch (err) {
      res.type("application/json").status(500).send(err);
    }
  },
};
