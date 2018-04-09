'use strict';
const mongoose = require('mongoose');

module.exports = new mongoose.Schema({
    name: String,
    add_date: Date,
    isDel: Boolean
});