module.exports = function (router) {
    var log = require("../controllers/logCtrl");
    var utils = require("../utils/middleware");
    var middlewares = [utils.CheckUrl];
    router.get("/log/get", log.getLogs);
    router.post("/log/middleware/error/add", log.addMiddlewareErrorLog);
    router.post("/log/middleware/success/add", log.addMiddlewareSuccessLog);



    return router;
  };