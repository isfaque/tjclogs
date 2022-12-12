module.exports = function (router) {
    var log = require("../controllers/logCtrl");
    var utils = require("../utils/middleware");
    var middlewares = [utils.CheckUrl];
    router.get("/log/get", log.getLogs);
    router.post("/log/middleware/error/add", log.addMiddlewareErrorLog);
    router.post("/log/middleware/error/remove", log.removeMiddlewareErrorLog);
    router.post("/log/middleware/success/add", log.addMiddlewareSuccessLog);
    router.post("/log/middleware/exception/add", log.addMiddlewareExceptionLog);




    return router;
  };