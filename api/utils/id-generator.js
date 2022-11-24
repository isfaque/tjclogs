"use strict";
const moment = require("moment");

const generateRandom = (label) => {
  let generatedId = `${label}${moment().unix()}${randomStr()}`;
  return generatedId;
};

const randomStr = () => {
  let length = 3;
  let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let result = "";
  for (var i = length; i > 0; --i)
    result += chars[Math.floor(Math.random() * chars.length)];
  return result;
};
module.exports = {
  generateRandom,
  randomStr,
};

// ${Math.floor( Math.random() * 99999 + 11111)}
