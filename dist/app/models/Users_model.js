'use strict';

var mongoose = require('mongoose');
// 将schema模型导入
var usersSchema = require('../schemas/users_schema');

// 构造一个模型
module.exports = mongoose.model('Users', usersSchema);
//# sourceMappingURL=Users_model.js.map