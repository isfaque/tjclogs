var createError = require("http-errors");
var express = require("express");
const cors = require("cors");
var path = require("path");
var logger = require("morgan");
const bodyParser = require("body-parser");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./api/swagger/swagger.json");
// const swaggerDocument = require("./api/swagger/swagger.json");

// require('custom-env').env('local')

var app = express();
app.use(cors());

global.__rootRequire = function (relpath) {
  return require(path.join(__dirname, relpath));
};

if (!process.env.NODE_ENV || process.env.NODE_ENV == undefined) {
  process.env.NODE_ENV = "prod";
}

const config = require("./api/config/config.js").get(process.env.NODE_ENV);
console.log("config------------", config.host + "" + config.port + "/apiDocs");
swaggerDocument.host = config.host + "" + config.port;
require("./api/config/db");

app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 1000000,
  })
);


// All api requests
app.use(function (req, res, next) {
  // CORS headers
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");

  // Set custom headers for CORS
  res.header(
    "Access-Control-Allow-Headers",
    "Content-type,Accept,X-Access-Token,X-Key,If-Modified-Since,Authorization,multipart/form-data"
  );

  if (
    req.method == "OPTIONS" ||
    (req.method == "GET" && req.path.includes("/uploads"))
  ) {
    res.status(200).end();
  } else {
    next();
  }
});

app.use(
  bodyParser.json({
    limit: "50mb",
  })
);

app.use("/apiDocs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// app.use("/apiDocsV2", swaggerUi.serve, swaggerUi.setup(swaggerDocumentV2));

app.use("/api", require("./api/routes/routes")(express));

app.use(logger("dev"));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(express.static(path.join(__dirname, "public")));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  console.log("req.url", req.url)
  console.log("err in app.js", err)
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send("error");
});

// start server
var port = process.env.NODE_ENV.PORT || config.port;
var server = app.listen(port);

module.exports = app;

// NODE_ENV=staging npm start
