const Comments = require("../../model/CommentSchema");

const get_comments = function (req, res) {
  return new Promise(async function (resolve, reject) {
    try {
      const param = await req?.query?.id;
      const comments = param ? await Comments.find({ postId: parseInt(param) }).exec() : await Comments.find({}).exec();
      if (comments) resolve(comments);
    } catch (err) {
      reject(err.toString());
    }
  });
};

module.exports = {
  ServiceCall: async function (req, res) {
    try {
      const comments = await get_comments(req, res);
      res.type("application/json").status(200).send(comments);
    } catch (err) {
      res.type("application/json").status(500).send(err);
    }
  },
};
