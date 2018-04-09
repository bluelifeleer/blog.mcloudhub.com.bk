'use strict';

var mongoose = require('mongoose');
module.exports = new mongoose.Schema({
    user_id: String,
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    },
    originalname: String, //上传文件原名称
    filename: String, //文件上传后的新名字
    path: String, //上传文件后的路径
    fullpath: String, //文件上传后的完整路径
    encoding: String, //上传文件编码方式
    mimetype: String, //上传文件类型
    size: Number, //上传文件大小
    add_date: Date, //上传文件时间
    isDel: Number //上传文件是否删除
});
//# sourceMappingURL=photos_schema.js.map