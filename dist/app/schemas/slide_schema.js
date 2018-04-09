'use strict';

var mongoose = require('mongoose');

module.exports = new mongoose.Schema({
    path: String,
    title: String,
    describe: String,
    add_date: Date,
    isDel: Number
});
//# sourceMappingURL=slide_schema.js.map