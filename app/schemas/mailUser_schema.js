'use strict';
const mongoose = require('mongoose');

module.exports = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    group:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MailGroup'
    },
    mark: String,
    add_date: Date,
    isDel: Boolean
});