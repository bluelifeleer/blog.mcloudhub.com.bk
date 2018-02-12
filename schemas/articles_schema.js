const mongoose = require('mongoose');

module.exports = new mongoose.Schema({
    uid: String,
    doc_id:String,  // 文章所属文档id
    doc_name:String, // 文集名称
    author: String, //文章作者
    title: String, // 文章标题
    describe: String, // 文章描述
    photos: String, // 文章图片
    contents: String, // 文章内容
    markDownText: String, // 文章内容
    watch: Number, // 查看
    start: Number, // 喜欢
    fork: Number, // 分享
    issue: Number, //评论
    add_date: String,
    isRelease: Number,  //是否发布，1：发布，0：没有发布
    isDel: Number,
});