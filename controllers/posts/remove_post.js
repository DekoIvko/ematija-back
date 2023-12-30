const Post = require("../../model/PostSchema");

const remove_post = function (req, res) {
  return new Promise(async function (resolve, reject) {
    try {
      const postId = await req.query.postId;
      const removedPost = await Post.deleteOne({ id: postId });
      resolve({ message: "Successfully remove post!", data: removedPost | {}, status: 200 });
    } catch (err) {
      reject(err.toString());
    }
  });
};

module.exports = {
  ServiceCall: async function (req, res) {
    try {
      const post = await remove_post(req, res);
      res.type("application/json").status(200).send(post);
    } catch (err) {
      res.type("application/json").status(500).send(err);
    }
  },
};
