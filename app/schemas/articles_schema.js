const mongoose = require('mongoose');

module.exports = new mongoose.Schema({
    user_id: String,
    doc_id: String,
    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
    },
    document:{                          // 文章所属文档
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Document',
    },
    title: String, // 文章标题
    describe: String, // 文章描述
    photos: String, // 文章图片
    contents: String, // 文章内容
    markDownText: String, // 文章内容
    watch: Number, // 查看
    watch_users:[
        {
            type: mongoose.Schema.Types.ObjectId,
            res: 'Users',
        }
    ],
    start: Number, // 喜欢
    start_users:[
        {
            type: mongoose.Schema.Types.ObjectId,
            res: 'Users',
        }
    ],
    fork: Number, // 分享
    fork_users:[
        {
            type: mongoose.Schema.Types.ObjectId,
            res: 'Users',
        }
    ],
    issue: Number, //评论
    issue_contents:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Discuss',
    }],
    follows: Number, // 用户关注数
    follow_users: [{ //关注的用户
        // id: String
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    }],
    permissions: Number,    // 权限，1：public(公开)，2：private（私密），3：protected，
    add_date: String,
    last_update_date: String,
    isRelease: Number, //是否发布，1：发布，0：没有发布
    isDel: Number,
});
