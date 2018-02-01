const mongoose = require('mongoose');

module.exports = new mongoose.Schema({
    uid: String,
    title: String,
    describe: String,
    photos: String,
    contents: String,
    watch: Number,
    start: Number,
    fork: Number,
    add_date: Date,
    isDel: Number,
});