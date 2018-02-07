const mongoose = require('mongoose');
const documentSchema = require('../schemas/document');

module.exports = mongoose.model('Document',documentSchema);