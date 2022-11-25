'use strict';

var mongoose = require('mongoose');

var mwDWErrorModel = new mongoose.Schema({


    data: {
        type: Object,
        default: null
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('mwdwerror', mwDWErrorModel);