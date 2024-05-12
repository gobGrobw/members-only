const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = mongoose.model(
	'Message',
	new Schema({
		title: { type: String, required: true },
		author: { type: Schema.Types.ObjectId, required: true },
		date: { type: Date, required: true },
		message: { type: String, required: true },
	})
);

