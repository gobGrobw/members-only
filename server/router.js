const express = require('express');
const passport = require('passport');
const router = express.Router();

const message_controller = require('./controllers/messageController');
const user_controller = require('./controllers/userController');

// Show all messages
router.get('/', message_controller.detail);

// // // USER CONTROLLER // // //

// Sign in form
router.get('/sign-in', user_controller.sign_in_GET);

// Process sign in POST
router.post('/sign-in', user_controller.sign_in_POST);

// Log in form
router.get('/log-in', user_controller.log_in_GET);

// Process log in POST
router.post('/log-in', user_controller.log_in_POST);

// Log out from account
router.get('/log-out', user_controller.log_out_GET);

// Apply for member
router.get('/member', user_controller.member_GET);

// Process POST request from member form
router.post('/member', user_controller.member_POST);

// Become admin
router.get('/admin', user_controller.admin_GET);

// Process POST request from admin form
router.post('/admin', user_controller.admin_POST);

// // // MESSAGE CONTROLLER // // //

// Post message form
router.get('/post-message', message_controller.post_message_GET);

// Process POST create message
router.post('/post-message', message_controller.post_message_POST);

// Delete message
router.post('/delete/:id', message_controller.delete_msg_GET);

module.exports = router;

