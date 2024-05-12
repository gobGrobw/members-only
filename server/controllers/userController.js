const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');
const passport = require('passport');
const bcrypt = require('bcryptjs');

const User = require('../models/User');

module.exports = {
	sign_in_GET: (req, res) => {
		res.render('sign-in-form', {
			errors: null,
		});
	},

	sign_in_POST: [
		body('username', 'Username must be atleast 4 to 10 letters long')
			.trim()
			.isLength({ min: 4, max: 10 })
			.escape(),

		body('password', 'Password must be atleast 5 letters long')
			.trim()
			.isLength({ min: 5 })
			.escape(),

		asyncHandler(async (req, res, next) => {
			const errors = validationResult(req);

			const user = new User({
				username: req.body.username,
				password: await bcrypt.hash(req.body.password, 10),
				status: 'user',
			});

			if (!errors.isEmpty()) {
				res.render('sign-in-form', {
					errors: errors,
				});
			} else {
				await user.save();
				res.redirect('log-in');
			}
		}),
	],

	log_in_GET: (req, res, next) => {
		res.render('log-in-form', {
			errors: null,
		});
	},

	log_in_POST: passport.authenticate('local', {
		successRedirect: '/',
		failureRedirect: '/homepage/log-in',
	}),
};

