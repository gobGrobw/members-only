const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');
const Message = require('../models/Message');

module.exports = {
	detail: asyncHandler(async (req, res, next) => {
		const allMessages = await Message.find().sort({ date: -1 }).exec();

		res.render('index', {
			messages: allMessages,
			user: res.locals.currentUser,
		});
	}),

	post_message_GET: (req, res) => {
		res.render('post-message-form', { errors: null });
	},

	post_message_POST: [
		body('title', 'Title has to be atleast 1 letter long').trim().isLength({ min: 1 }).escape(),

		body('message', 'Message must be atleast 1 letter long')
			.trim()
			.isLength({ min: 1 })
			.escape(),

		asyncHandler(async (req, res, next) => {
			const errors = validationResult(req);

			const message = new Message({
				author: res.locals.currentUser.id,
				title: req.body.title,
				message: req.body.message,
				date: new Date(),
			});

			if (!errors.isEmpty()) {
				res.render('post-message-form', { errors: errors });
			} else {
				await message.save();
				res.redirect('/');
			}
		}),
	],

	delete_msg_GET: asyncHandler(async (req, res, next) => {
		await Message.findByIdAndDelete(req.params.id);
		res.redirect('/');
	}),
};

