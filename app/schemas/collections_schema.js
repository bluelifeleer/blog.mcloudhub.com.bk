const mongoose = require('mongoose');
module.exports = new mongoose.Schema({
    user_id: String,
    name: String, // 集合名称
    type: Number, // 集合类型
    icon: String, // 集合图标
    describe: String, // 集合描述
    add_date: Date, // 集合添加时间,
    admins: [{ // 其他管理员
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    }],
    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    },
    push: Number, // 是否允许投稿
    follow: Number, // 关注数
    subscribe: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    }],
    include: Number, //收录文章数
    article_id:[
        {
            id: String
        }
    ],
    article: [{ //收录文章的
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Articles'
    }],
    verify: Number, // 是否需要审核
    isDel: Number // 是否删除
});
