'use string';
const mongoose = require('mongoose');
const mailUserSchema = require('../schemas/mailUser_schema');
module.exports = mongoose.model('MailUser',mailUserSchema);