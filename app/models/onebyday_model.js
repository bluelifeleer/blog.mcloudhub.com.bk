'use strict';
const mongoose = require('mongoose');
const onebydaySchema = require('../schemas/onebyday_schema');
module.exports = mongoose.model('OneByDay', onebydaySchema);