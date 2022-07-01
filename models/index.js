const config = require("../constants");
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const models = {
  mongoose: mongoose,
  url: config.dbUrl,
  validators: require("./validator.model")(mongoose),
  pools: require("./pool.model")(mongoose),
  proposals: require("./proposal.model")(mongoose),
  supplies: require("./supply.model")(mongoose),
  inflations: require("./inflation.model")(mongoose),
  valopers: require("./valoper.model")(mongoose),
};

module.exports = models;
