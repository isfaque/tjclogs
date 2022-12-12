'use strict';

var mongoose = require('mongoose');

var exceptionModel = new mongoose.Schema({


    data: {
        type: Object,
        default: null
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('exception', exceptionModel);