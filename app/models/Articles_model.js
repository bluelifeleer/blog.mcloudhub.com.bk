'use strict';
const mongoose = require('mongoose');
const articleSchema = require('../schemas/articles_schema');
module.exports = mongoose.model('Articles', articleSchema);
