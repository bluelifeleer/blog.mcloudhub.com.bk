'use strict';

var mongoose = require('mongoose');

module.exports = new mongoose.Schema({
    uid: String, //评论的用户id
    article_id: String, //评论的文章id
    article_uid: String, //评论的文章的用户id
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    },
    article: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Articles'
    }],
    contents: String, //评论的内容
    permissions: Number, // 权限，1：public(公开)，2：private（私密），3：protected，
    add_date: Date, //评论时间
    isDel: Number
});
//# sourceMappingURL=discuss_schema.js.map