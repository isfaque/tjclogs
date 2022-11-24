"use strict";
let mongoose = require("mongoose"),
  EMAIL_TEMPLATE = mongoose.model("emailTemplate"),
  handlebars = require("handlebars"),
  nodemailer = require("nodemailer"),
  Constant = require("../utils/constant"),
  commonQuery = require("../utils/commonQuery"),
  config = require("../config/config").get(process.env.NODE_ENV);

module.exports = {
  send: send,
  sendMail: sendMail,
  GetEmailTemplateBycode: GetEmailTemplateBycode,
};

function send(templateCode, metadata, email_too) {
  return new Promise(async (resolve, reject) => {
    try {
      if (metadata && templateCode) {
        let template;
        template = await GetEmailTemplateBycode({
          templateCode: templateCode,
        }).catch((error) => {
          return reject(Constant.SOMETHING_WENT_WRONG);
        });

        if (!template) return reject("Template" + Constant.NOT_FOUND_MESSAGE);
        let handle_obj = handlebars.compile(template.body);
        template.body = handle_obj(metadata);
        for (var i = 0; i < email_too.length; i++) {
          let email_to = email_too[i];
          sendMail(email_to, template.subject, template.body)
            .then((result) => {
              return resolve(result);
            })
            .catch((err) => {
              console.log("MAILER ERROR ::", err);
              return reject(err);
            });
        }
      } else {
        return reject(Constant.NOT_PROPER_DATA);
      }
    } catch (error) {
      return reject(Constant.NOT_PROPER_DATA);
    }
  });
}

function GetEmailTemplateBycode(req) {
  return new Promise((resolve, reject) => {
    try {
      if (req.templateCode) {
        let condition = {
          templateCode: req.templateCode,
        };
        commonQuery
          .findoneData(EMAIL_TEMPLATE, condition)
          .then((result) => {
            return resolve(result);
          })
          .catch((err) => {
            reject(Constant.INTERNAL_ERROR);
          });
      } else {
        return reject(Constant.INVALID_EMAIL_CODE);
      }
    } catch (error) {
      return reject(Constant.SOMETHING_WENT_WRONG);
    }
  });
}

function sendMail(to, subject, message, attachments = []) {
  return new Promise((resolve, reject) => {
    try {
      if (to && subject && message) {
        let smtpTransport = nodemailer.createTransport({
          service: config.SMTP.service,
          host: config.SMTP.host,
          port: config.SMTP.port,
          secure: config.SMTP.secure,
          auth: {
            user: config.SMTP.authUser,
            pass: config.SMTP.authpass,
          },
        });
        console.log(smtpTransport);
        let mailOptions = {
          to: to != "self" ? to : config.SMTP.authUser,
          from: config.SMTP.authUser,
          subject: subject,
          html: message,
        };

        if (attachments && attachments.length)
          mailOptions["attachments"] = attachments;

        smtpTransport.sendMail(mailOptions, (err, res) => {
          if (err) {
            return reject(err);
          } else {
            return resolve(res);
          }
        });
      } else {
        return reject(Constant.NOT_PROPER_DATA);
      }
    } catch (error) {
      return reject(Constant.SOMETHING_WENT_WRONG);
    }
  });
}
