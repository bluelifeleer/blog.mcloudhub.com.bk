'use strict';
const mongoose = require('mongoose');
const appsSchema = require('../schemas/apps_schema');
module.exports = mongoose.model('Apps', appsSchema);