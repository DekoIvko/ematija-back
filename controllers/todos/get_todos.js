const Todo = require("../../model/TodosSchema");

const get_todos = function (req, res) {
  return new Promise(async function (resolve, reject) {
    try {
      const param = await req?.query?.userId;
      const todos = param ? await Todo.find({ userId: parseInt(param) }).exec() : await Post.find({}).exec();
      if (todos) resolve(todos.toReversed());
    } catch (err) {
      reject(err.toString());
    }
  });
};

module.exports = {
  ServiceCall: async function (req, res) {
    try {
      const todos = await get_todos(req, res);
      res.type("application/json").status(200).send(todos);
    } catch (err) {
      res.type("application/json").status(500).send(err);
    }
  },
};
