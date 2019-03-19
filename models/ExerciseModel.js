const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
	userID: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	duration: {
		type: Number,
		required: true
	},
	date: Date
});

module.exports = mongoose.model('exercise', exerciseSchema);
