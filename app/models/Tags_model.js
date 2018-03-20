const mongoose = require('mongoose');

const tagsSchema = require('../schemas/tags_schema');

module.exports = mongoose.model('Tags', tagsSchema);