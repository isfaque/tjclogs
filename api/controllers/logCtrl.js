"use strict";

var mongoose = require("mongoose"),
  request = require('request'),
  jwt = require("jsonwebtoken"),
  crypto = require("crypto"),
  Constant = require("../utils/constant"),
  mresponse = require("../utils/responseHandler"),
  validator = require("../utils/validator"),
  MW_DW_ERROR = mongoose.model("mwdwerror"),
  MW_DW_SUCCESS = mongoose.model("mwdwsuccess"),

  Config = require("../config/config").get(process.env.NODE_ENV),
  commonQuery = require("../utils/commonQuery");



module.exports = {
  getLogs: getLogs,
  addMiddlewareErrorLog: addMiddlewareErrorLog,
  addMiddlewareSuccessLog: addMiddlewareSuccessLog

};


  function getLogs(req, res) {
    async function asy_init() {

        res.send("Hello TJC Logs");

    }
    asy_init();
  }

  function addMiddlewareErrorLog(req, res) {
    async function asyCreate() {

        try {

                let data = {
                    data: req.body.data
                }
                let requestData = await commonQuery.InsertIntoCollection(MW_DW_ERROR, data);

                return mresponse(res, Constant.SUCCESS_CODE, Constant.DATA_SAVE_SUCCESS, requestData);
            
        } catch (err) {
            return mresponse(res, Constant.ERROR_CODE, err);
        };

    }
    asyCreate();
}

function addMiddlewareSuccessLog(req, res) {
  async function asyCreate() {

      try {

              let data = {
                  data: req.body.data
              }
              let requestData = await commonQuery.InsertIntoCollection(MW_DW_SUCCESS, data);

              return mresponse(res, Constant.SUCCESS_CODE, Constant.DATA_SAVE_SUCCESS, requestData);
          
      } catch (err) {
          return mresponse(res, Constant.ERROR_CODE, err);
      };

  }
  asyCreate();
}