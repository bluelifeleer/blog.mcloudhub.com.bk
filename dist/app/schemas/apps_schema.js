'use strict';

var mongoose = require('mongoose');
var appsSchema = new mongoose.Schema({
    user_id: String,
    name: String,
    desc: String,
    redirect_uri: String, // 回调地址
    avatar: String,
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        res: 'Users'
    },
    type: Number, // 应用类型，1：pc，2：app
    app_id: Number,
    secret_key: String,
    status: Number, // 应用状态，1：开启，2：暂停
    effective: Boolean, // 应用是否有效
    is_del: Boolean,
    add_date: Date
});
module.exports = appsSchema;
//# sourceMappingURL=apps_schema.js.map