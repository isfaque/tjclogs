module.exports = function (express) {
  var router = express.Router();
  require("./logRoute")(router);

  return router;
};
