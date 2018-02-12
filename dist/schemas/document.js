'use strict';

var mongoose = require('mongoose');

module.exports = new mongoose.Schema({
    uid: String, // 用户id
    name: String, // 文档名称
    photos: String, // 文档图标
    describe: String, // 文档描述
    add_date: String, // 文档创建时间
    isDel: Number // 文档是否删除
});
//# sourceMappingURL=document.js.map