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

	log_out_GET: (req, res, next) => {
		req.logout((err) => {
			if (err) return next(err);
			res.redirect('/');
		});
	},

	member_GET: (req, res) => {
		res.render('member-form');
	},

	member_POST: [
		body('member').trim().isIn(['member']).withMessage("Just type 'member'").escape(),

		asyncHandler(async (req, res, next) => {
			const user = new User({
				_id: res.locals.currentUser.id,
				username: res.locals.currentUser.username,
				password: res.locals.currentUser.password,
				status: 'member',
			});

			await User.findByIdAndUpdate(res.locals.currentUser.id, user);
			res.redirect('/');
		}),
	],

	admin_GET: (req, res) => {
		res.render('be-admin-form');
	},

	admin_POST: [
		body('admin-pw', 'Incorrect!').trim().isIn(['greatGob123']).escape(),

		asyncHandler(async (req, res, next) => {
			const user = new User({
				_id: res.locals.currentUser.id,
				username: res.locals.currentUser.username,
				password: res.locals.currentUser.password,
				status: 'admin',
			});

			await User.findByIdAndUpdate(res.locals.currentUser.id, user);
			res.redirect('/');
		}),
	],
};

