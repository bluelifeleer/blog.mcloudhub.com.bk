const mongoose = require('mongoose');
const documentSchema = require('../schemas/document_schema');

module.exports = mongoose.model('Document', documentSchema);
