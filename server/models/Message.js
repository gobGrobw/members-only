const mongoose = require('mongoose');
const { DateTime } = require('luxon');
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
	title: { type: String, required: true },
	author: { type: Schema.Types.ObjectId, required: true },
	date: { type: Date, required: true },
	message: { type: String, required: true },
});

MessageSchema.virtual('date_formatted').get(function () {
	return DateTime.fromJSDate(this.date).toLocaleString(DateTime.DATETIME_MED);
});

module.exports = mongoose.model('Message', MessageSchema);

