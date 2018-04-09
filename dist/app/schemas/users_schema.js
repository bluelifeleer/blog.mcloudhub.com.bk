'use strict';

var mongoose = require('mongoose');
//定义表结构，创建一个schema模型
module.exports = new mongoose.Schema({
    name: String, //定义用户名集合字段
    password: String, //定义用户密码集合字段
    salt: String, //定义验证值集合字段
    sex: Number, //定义用户性别集合字段
    age: Number, //定义用户头像集合字段,
    nick: String, //昵称
    qq: String, //qq
    phone: String, //手机
    wechat: String, //微信
    avatar: String, //头像
    email: String, //邮箱
    website: String, // 个人网站
    introduce: String, //个人介绍
    editors: Number, //常用编辑器
    rewardStatus: Number, // 赞赏设置
    rewardDesc: String, // 赞赏描述
    type: Number, // 用户注册类型
    follows: Number, // 用户关注数
    email_verify: Boolean, // 邮箱是否验证
    follow_users: [{ //关注的用户
        // id: String
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    }],
    article: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Articles'
    }],
    github_id: Number,
    github: {}, //github授权帐号信息
    add_date: Date,
    isDel: Number
});
//# sourceMappingURL=users_schema.js.map