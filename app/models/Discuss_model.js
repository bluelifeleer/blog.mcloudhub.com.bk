const mongoose = require('mongoose');
const Discuss_schema = require('../schemas/discuss_schema');

module.exports = mongoose.model('Discuss', Discuss_schema);
