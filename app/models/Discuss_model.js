const mongoose = require('mongoose');
const Discuss_schema = require('../schemas/discuss');

module.exports = mongoose.model('Discuss', Discuss_schema);
