const Notification = require("../../model/NotificationSchema");
const { Server } = require("socket.io");

const get_notifications = function (req, res) {
  return new Promise(async function (resolve, reject) {
    try {
      const param = await req?.query?.userId;

      const notifications = await Notification.find({ toUserId: parseInt(param) }).exec();
      if (notifications) resolve(notifications.toReversed());
    } catch (err) {
      reject(err.toString());
    }
  });
};

module.exports = {
  ServiceCall: async function (req, res) {
    try {
      const notifications = await get_notifications(req, res);
      res.type("application/json").status(200).send(notifications);
    } catch (err) {
      res.type("application/json").status(500).send(err);
    }
  },
};
