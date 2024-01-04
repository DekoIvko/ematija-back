const Notification = require("../../model/NotificationSchema");

const add_notification = function (req, res) {
  return new Promise(async function (resolve, reject) {
    try {
      const postLength = await Notification.find().exec();
      //   const newPost = await Notification.create({
      //     id: ++postLength.length,
      //     title: req.body.title,
      //     body: req.body.body,
      //     userId: req.body.userId,
      //     tags: req.body.tags,
      //     reactions: [],
      //   });

      if (newPost) resolve({ message: "Successfully add post!", data: newPost, status: 200 });
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
