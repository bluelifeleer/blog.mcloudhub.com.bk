const mongoose = require('mongoose');
const momentsSchema = require('../schemas/moments_schema');
module.exports = mongoose.model('Moments', momentsSchema);