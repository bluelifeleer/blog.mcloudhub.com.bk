const mongoose = require('mongoose');
const Moments = require('../schemas/moments_schema');
module.exports = mongoose.model('Moments', Moments);