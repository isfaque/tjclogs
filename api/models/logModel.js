'use strict';

var mongoose = require('mongoose');

var middlewareLogModel = new mongoose.Schema({

    source: {
        type: String,
        default: null
    },
    data: {
        type: Object,
        default: null
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('middlewarelog', middlewareLogModel);