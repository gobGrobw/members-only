const express = require('express');
const passport = require('passport');
const router = express.Router();

const message_controller = require('./controllers/messageController');
const user_controller = require('./controllers/userController');

// Show all messages
router.get('/', message_controller.detail);

// Sign in form
router.get('/sign-in', user_controller.sign_in_GET);

// Process sign in POST
router.post('/sign-in', user_controller.sign_in_POST);

// Log in form
router.get('/log-in', user_controller.log_in_GET);

// Process log in POST
router.post('/log-in', user_controller.log_in_POST);

// Membership form
router.get('/member', (req, res) => {
	res.send('Not implemented: Membership');
});

module.exports = router;

