const mongoose = require('mongoose');
const collectionsSchema = require('../schemas/collections_schema');
module.exports = mongoose.model('Collections',collectionsSchema);
