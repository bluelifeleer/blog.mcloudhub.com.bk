const mongoose = require('mongoose');

module.exports = new mongoose.Schema({
	uid: String,
	own: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Users'
	},
	url: String,
	title: String,
	link: String,
	click: Number,
	describe: String,
	add_date: Date,
	isDel: Number,
});
