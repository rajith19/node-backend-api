const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check } = require('express-validator');

const authController = require("../controllers/auth");

const User = require('../models/User');

// @route     GET api/auth
// @desc      Get logged in user
// @access    Private
router.get('/', auth, authController.getLoggedInUser);

// @route     POST api/auth
// @desc      Auth user & get token
// @access    Public
router.post(
  '/',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  authController.authUserGetToken
);


// @route     POST api/auth/forgot
// @desc      resetpassword get token
// @access    Public
router.post(
  '/forgot',
  [
    check('email', 'Please include a valid email').isEmail(),
  ],
  authController.forgotPassword
);

// @route     POST api/auth/password/reset/:token
// @desc      auth reset token
// @access    Public
router.route('/password/reset/:token').put(authController.resetPassword)

module.exports = router;
