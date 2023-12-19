const Comment = require("../../model/CommentSchema");

const add_comment = function (req, res) {
  return new Promise(async function (resolve, reject) {
    try {
      const comments = await Comment.find({}).exec();
      const newComment = await Comment.create({ ...req.body, id: comments.length++ });

      resolve(newComment);
    } catch (err) {
      reject(err.toString());
    }
  });
};

module.exports = {
  ServiceCall: async function (req, res) {
    try {
      const comment = await add_comment(req, res);
      res.type("application/json").status(200).send(comment);
    } catch (err) {
      res.type("application/json").status(500).send(err);
    }
  },
};
