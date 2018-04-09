'use strict';

var mongoose = require('mongoose');

module.exports = new mongoose.Schema({
    uid: String,
    contents: String,
    photos: String,
    add_date: Date,
    isDel: Number
});
//# sourceMappingURL=moments_schema.js.map