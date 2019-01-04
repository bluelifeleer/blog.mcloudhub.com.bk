const mongoose = require('mongoose');

module.exports = new mongoose.Schema({
	uid: String,
	own: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Users'
	},
	adv: {
		slides: [{
			url: String,
			title: String,
			link: String,
			click: Number,
			remark: String,
			size: String,
		}],
		advs: [{
			url: String,
			link: String,
			title: String,
			click: Number,
			remark: String,
			width: Number,
			height: Number,
			size: String
		}]
	},
	add_date: Date,
	isDel: Number,
});
