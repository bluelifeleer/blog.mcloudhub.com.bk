'use string';
const mongoose = require('mongoose');
const mailGroupSchema = require('../schemas/mailGroup_schema');
module.exports = mongoose.model('MailGroup',mailGroupSchema);