const mongoose = require('mongoose');
module.exports = new mongoose.Schema({
    uid: String,
    name: String,           // 集合名称
    type: Number,           // 集合类型
    icon: String,           // 集合图标
    describe: String,       // 集合描述
    add_date : Date,        // 集合添加时间,
    admins: [{
        uid: String,
        name: String
    }],         // 其他管理员
    push: Number,           // 是否允许投稿
    follow: Number,         // 关注数
    subscribe:[{
        uid: String
    }],
    include: Number,        //收录文章数
    article_ids:[{          //收录文章的id
        id:String
    }],
    verify: Number,          // 是否需要审核
    isDel : Number          // 是否删除
});