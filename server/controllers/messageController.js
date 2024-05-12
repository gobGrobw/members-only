const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');
const Message = require('../models/Message');

module.exports = {
	detail: asyncHandler(async (req, res, next) => {
		const allMessages = await Message.find().exec();

		res.render('index', {
			messages: allMessages,
			user: res.locals.currentUser,
		});
	}),
};

