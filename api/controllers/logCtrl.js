"use strict";

var mongoose = require("mongoose"),
  request = require('request'),
  jwt = require("jsonwebtoken"),
  crypto = require("crypto"),
  Constant = require("../utils/constant"),
  mresponse = require("../utils/responseHandler"),
  validator = require("../utils/validator"),
  MIDDLEWARE_LOG = mongoose.model("middlewarelog"),

  Config = require("../config/config").get(process.env.NODE_ENV),
  commonQuery = require("../utils/commonQuery");



module.exports = {
  getLogs: getLogs,
  addMiddlewareLog: addMiddlewareLog
};


  function getLogs(req, res) {
    async function asy_init() {

        res.send("Hello TJC Logs");

    }
    asy_init();
  }

  function addMiddlewareLog(req, res) {
    async function asyCreate() {

        try {

                let data = {
                    source: "middleware",
                    data: req.body.data,
                }
                let requestData = await commonQuery.InsertIntoCollection(MIDDLEWARE_LOG, data);

                return mresponse(res, Constant.SUCCESS_CODE, Constant.DATA_SAVE_SUCCESS, requestData);
            
        } catch (err) {
            return mresponse(res, Constant.ERROR_CODE, err);
        };

    }
    asyCreate();
}