const mongoose = require('mongoose');
const slideSchema = require('../schemas/slide_schema');
module.exports = mongoose.model('Slide',slideSchema);