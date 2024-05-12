const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
require('dotenv').config();

// Establish connection with mongodb
mongoose
	.connect(process.env.MONGO_URI)
	.then(() => {
		console.log('Database connected!');
	})
	.catch((err) => {
		console.error(err);
	});

// Set up view engine and static
const app = express();

app.use('views', __dirname + '/views');
app.use('view engine', 'pug');
app.use(express.static(__dirname + '/public'));

// Set up session middleware
app.use(
	session({ secret: 'unicouniuni', resave: false, saveUninitialized: true })
);
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));

