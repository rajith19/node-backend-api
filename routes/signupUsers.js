const express = require('express');
const router = express.Router();
const { check } = require('express-validator');


const signUpUserController = require('../controllers/signupUsers');

// @route     POST api/users
// @desc      Regiter a user
// @access    Public
router.post(
  '/',
  [
    check('name', 'Please add name')
      .not()
      .isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters',
    ).isLength({ min: 6 }),
  ],
  signUpUserController.registerUser
);

module.exports = router;
