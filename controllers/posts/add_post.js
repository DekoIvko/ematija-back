const Post = require("../../model/PostSchema");

const add_post = function (req, res) {
  return new Promise(async function (resolve, reject) {
    try {
      const posts = await Post.find({}).exec();
      const newPost = await Post.create({
        id: posts.length++,
        title: req.body.title,
        body: req.body.body,
        userId: req.body.userId,
        tags: req.body.tags,
        reactions: [],
      });

      if (newPost) resolve({ message: "Successfully add post!", data: newPost, status: 200 });
    } catch (err) {
      reject(err.toString());
    }
  });
};

module.exports = {
  ServiceCall: async function (req, res) {
    try {
      const post = await add_post(req, res);
      res.type("application/json").status(200).send(post);
    } catch (err) {
      res.type("application/json").status(500).send(err);
    }
  },
};
