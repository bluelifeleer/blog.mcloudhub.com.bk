const mongoose = require('mongoose');
const Photos_schema = require('../schemas/photos_schema');

module.exports = mongoose.model('Photos',Photos_schema);