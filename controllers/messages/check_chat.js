const Chat = require("../../model/ChatSchema");
const User = require("../../model/UserSchema");
const Message = require("../../model/MessageSchema");

const get_messages = function (chatId) {
  return new Promise(async function (resolve, reject) {
    try {
      const messages = await Message.find({ chatId: parseInt(chatId) }).exec();
      if (messages) resolve(messages);
    } catch (err) {
      reject(err.toString());
    }
  });
};

const check_chat = function (req, res) {
  return new Promise(async function (resolve, reject) {
    try {
      const { senderIdOne, senderIdTwo } = await req?.body;

      const checkChat = await Chat.findOne({ senderIdOne: senderIdOne, senderIdTwo: senderIdTwo }).exec();
      let newChat;
      if (!checkChat) {
        const chatLength = await Chat.find({}).exec();
        newChat = await Chat.create({
          id: ++chatLength.length,
          senderIdOne,
          senderIdTwo,
        });
      }
      const returnChat = checkChat ? checkChat : newChat;
      const user = await User.findOne({ id: senderIdTwo }).exec();
      const messages = await get_messages(returnChat.id);
      // console.log(messages);
      const chat = {
        id: returnChat.id,
        senderIdOne: returnChat.senderIdOne,
        senderIdTwo: returnChat.senderIdTwo,
        senderIdTwoInfo: {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          image: user.image,
        },
        messages,
      };
      resolve(chat);
    } catch (err) {
      reject(err.toString());
    }
  });
};

module.exports = {
  ServiceCall: async function (req, res) {
    try {
      const messages = await check_chat(req, res);
      res.type("application/json").status(200).send(messages);
    } catch (err) {
      res.type("application/json").status(500).send(err);
    }
  },
};
