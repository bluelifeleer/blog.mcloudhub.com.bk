const mongoose = require('mongoose');

module.exports = new mongoose.Schema({
    uid: String,
    doc_id:String,  // 文章所属文档id
    title: String, // 文章标题
    describe: String, // 文章描述
    photos: String, // 文章图片
    contents: String, // 文章内容
    watch: Number,
    start: Number,
    fork: Number,
    add_date: Date,
    isDel: Number,
});