const mongoose = require('mongoose');

module.exports = new mongoose.Schema({
    user_id: String,
    name: String, // 文档名称
    photos: String, // 文档图标
    describe: String, // 文档描述
    add_date: String, // 文档创建时间
    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
    },
    article_id:[
        {
            id: String
        }
    ],
    article:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Articles',
        }
    ],
    isDel: Number, // 文档是否删除
});
