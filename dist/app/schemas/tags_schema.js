'use strict';

var mongoose = require('mongoose');
//定义表结构，创建一个schema模型
module.exports = new mongoose.Schema({
    uid: String,
    name: String, //定义用户名集合字段
    type: Number,
    photo: String,
    describe: String,
    add_date: Date,
    isDel: Number
});
//# sourceMappingURL=tags_schema.js.map