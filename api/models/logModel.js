'use strict';

var mongoose = require('mongoose');

var mwDWErrorsModel = new mongoose.Schema({


    data: {
        type: Object,
        default: null
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('mwdwerror', mwDWErrorsModel);