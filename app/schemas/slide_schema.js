const mongoose = require('mongoose');

module.exports = new mongoose.Schema({
	uid: String,
	own: {
		type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
	},
    path: String,
    title: String,
    describe: String,
    add_date: Date,
    isDel: Number,
});