const Post = require("../../model/PostSchema");

const add_reaction = function (req, res) {
  return new Promise(async function (resolve, reject) {
    try {
      const newReaction = { reaction: req.body.reaction, userId: req.body.userId };
      const post = await Post.findOne({ id: req.body.postId }).exec();
      const indexReaction = post.reactions.map((reaction) => reaction.userId).indexOf(req.body.userId);
      let added = "";
      if (indexReaction >= 0) {
        post.reactions.splice(indexReaction, 1);
        added = "removed";
      } else {
        post.reactions.push(newReaction);
        added = "added";
      }
      post.save();

      resolve({ message: "Successfully react!", data: { post, added }, status: 200 });
    } catch (err) {
      reject(err.toString());
    }
  });
};

module.exports = {
  ServiceCall: async function (req, res) {
    try {
      const reaction = await add_reaction(req, res);
      res.type("application/json").status(200).send(reaction);
    } catch (err) {
      res.type("application/json").status(500).send(err);
    }
  },
};
