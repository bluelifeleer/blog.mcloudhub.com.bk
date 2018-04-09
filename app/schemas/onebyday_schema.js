'use strict';
const mongoose = require('mongoose');
module.exports = new mongoose.Schema({
    "sid": Number,
    "tts": String,
    "content": String,
    "note": String,
    "love": Number,
    "translation": String,
    "picture": String,
    "picture2": String,
    "caption": String,
    "dateline": String,
    "s_pv": Number,
    "sp_pv": Number,
    "tags":  Array,
    "fenxiang_img": String,
    "date": String,
    "add_date": Date,
    "isDel":Number
});