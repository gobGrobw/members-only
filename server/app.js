const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const path = require('path');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Setting routes
const webRouter = require('./router');

// Establish connection with mongodb
mongoose
	.connect(process.env.MONGO_URI)
	.then(() => {
		console.log('Database connected!');
	})
	.catch((err) => {
		console.error(err);
	});

// Setting up view engine and static
const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

// Setting up session middleware
app.use(
	session({
		secret: 'unicouniuni',
		resave: false,
		saveUninitialized: true,
		cookie: {
			maxAge: 1 * 24 * 60 * 60 * 1000,
		},
	})
);
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use((req, res, next) => {
	res.locals.currentUser = req.user;
	next();
});

// Configuring Passport
const User = require('../server/models/User');

passport.use(
	new localStrategy(async (username, password, done) => {
		try {
			const user = await User.findOne({ username: username }).exec();
			if (!user)
				return done(null, false, { message: 'Incorrect username' });

			const match = await bcrypt.compare(password, user.password);
			if (!match)
				return done(null, false, { message: 'Incorrect password' });

			return done(null, user);
		} catch (error) {
			return done(error);
		}
	})
);

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
	try {
		const user = await User.findById(id);
		done(null, user);
	} catch (error) {
		done(error);
	}
});

// Setting up server
app.get('/', (req, res) => {
	res.redirect('/homepage');
});

app.use('/homepage', webRouter);

app.listen(3000, () => {
	console.log('Server listening on 3000');
});

