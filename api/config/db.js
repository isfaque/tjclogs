"use strict";
var mongoose = require("mongoose");

//All models schema test
__rootRequire("api/models/mwDWErrorModel");
__rootRequire("api/models/mwDWSuccessModel");



if (!process.env.NODE_ENV || process.env.NODE_ENV == undefined) {
  process.env.NODE_ENV = "local";
}

console.log("Node environment is:", process.env.NODE_ENV);
const config = require("./config.js").get(process.env.NODE_ENV);
var options = {
  user: config.DATABASE.username,
  pass: config.DATABASE.password,
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

console.log(process.env.NODE_ENV);
console.log(
  "dburl",
  config.DATABASE.host + config.DATABASE.port + "/" + config.DATABASE.dbname
);
mongoose.Promise = global.Promise;
// mongoose.connect(
//   config.DATABASE.host + config.DATABASE.port + "/" + config.DATABASE.dbname,
//   options
// );

mongoose.connect(
  config.DATABASE.host + config.DATABASE.port + "/" + config.DATABASE.dbname
);

var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection failed"));
db.once("open", function () {
  console.log("Database connected successfully!");
});
