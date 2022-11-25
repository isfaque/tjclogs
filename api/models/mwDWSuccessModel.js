'use strict';

var mongoose = require('mongoose');

var mwDWSuccessModel = new mongoose.Schema({


    data: {
        type: Object,
        default: null
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('mwdwsuccess', mwDWSuccessModel);