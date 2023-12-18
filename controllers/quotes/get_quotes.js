const Quotes = require("../../model/QuoteSchema");

const get_quotes = function (req, res) {
  return new Promise(async function (resolve, reject) {
    try {
      const param = await req?.query?.id;
      const quotes = param ? await Quotes.find({ userId: parseInt(param) }).exec() : await Quotes.find({}).exec();
      if (quotes) resolve(quotes);
    } catch (err) {
      reject(err.toString());
    }
  });
};

module.exports = {
  ServiceCall: async function (req, res) {
    try {
      const quotes = await get_quotes(req, res);
      res.type("application/json").status(200).send(quotes);
    } catch (err) {
      res.type("application/json").status(500).send(err);
    }
  },
};
