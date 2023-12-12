const Post = require("../../model/PostSchema");

const get_posts = function (req, res) {
  return new Promise(async function (resolve, reject) {
    try {
      const posts = await Post.find({}).exec();
      if (posts) resolve(posts);
    } catch (err) {
      reject(err.toString());
    }
  });
};

module.exports = {
  ServiceCall: async function (req, res) {
    try {
      const posts = await get_posts(req, res);
      res.type("application/json").status(200).send(posts);
    } catch (err) {
      res.type("application/json").status(500).send(err);
    }
  },
};
