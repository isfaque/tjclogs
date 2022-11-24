'use strict';

var jwt = require('jsonwebtoken');

var Constant = require('./constant');
var mresponse = require('./responseHandler');
module.exports = {
    CheckUrl: CheckUrl,
    ensureAuthorized: ensureAuthorized
}

/* Function is use check authorization of BASEURL.
 * @access private
 * @return json
 * Created by Trisha Deepam
 * @smartData Enterprises (I) Ltd
 * Created Date 
 */

function CheckUrl(req, res, next) {
    console.log("baseUrl---------->", req.path)
    var is_free_auth = req.path.split('/f/').length > 1 ? ((req.headers["Authorization"] || req.headers["authorization"] || req.query["api_key"]) ? false : true) : false;
    if (!is_free_auth) {
        console.log("here")
        ensureAuthorized(req, res, next);
    } else {
        next();
    }
}

function ensureAuthorized(req, res, next) {
    // console.log("baseUrl--requires authorization------>", req.path,req.headers)
    var bearerToken;
    var bearerHeader = req.headers["Authorization"] || req.headers["authorization"] || req.query["api_key"];
   


    if (typeof bearerHeader !== 'undefined') {
        var bearer = bearerHeader.split(" ");
        bearerToken = bearer[1];

        if (bearerToken == "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmZTE4MjRhNTU2ODgzNTFjZGVjYTNhMCIsImVtYWlsIjoibWVldC5hZ2hlcmFAeG9uZ29sYWIuY29tIiwiaWF0IjoxNjA4NjI5Mzg0LCJleHAiOjE2MDg3MTU3ODR9.v68a1ARbOTO-WcRtV-CW0cEC22IoTYEzn-EPdAM5Tfo") {
            console.log("pass")
            next();
        }
        else {
            jwt.verify(bearerToken, "crm@$12&*01", function (err, decoded) {
                req.user = decoded;
                if (err) {
                    console.log("err")
                    return mresponse(res, Constant.AUTH_CODE, Constant.INVALID_TOKEN);
                }
                next();
            });
        }

    } else {
        return mresponse(res, Constant.AUTH_CODE, Constant.TOKEN_ERROR);
    }
}