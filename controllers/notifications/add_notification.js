const Notification = require("../../model/NotificationSchema");

const add_notification = function (req, res) {
  return new Promise(async function (resolve, reject) {
    try {
      console.log("add notify");
      const notificationsLength = await Notification.find().exec();
      console.log("notificationsLength ", notificationsLength);
      const newNotification = await Notification.create({
        id: ++notificationsLength.length || 1,
        type: req.body.type,
        timestamp: req.body.timestamp,
        title: req.body.title,
        body: req.body.body,
        fromUserId: req.body.fromUserId,
        toUserId: req.body.toUserId,
      });
      console.log("newNotification ", newNotification);
      if (newNotification) resolve({ message: "Successfully add notification!", data: newNotification, status: 200 });
    } catch (err) {
      reject(err.toString());
    }
  });
};

module.exports = {
  ServiceCall: async function (req, res) {
    try {
      const notification = await add_notification(req, res);
      res.type("application/json").status(200).send(notification);
    } catch (err) {
      res.type("application/json").status(500).send(err);
    }
  },
};
