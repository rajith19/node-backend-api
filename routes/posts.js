const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {check, validationResult} = require('express-validator');

const User = require('../models/User');
const Contact = require('../models/Post');
const contrl = require('../controllers/posts')

// @route     GET api/contacts
// @desc      Get all users contacts
// @access    Private
router.get('/', auth, contrl.getAllPosts);

// @route     POST api/contacts
// @desc      Add new contact
// @access    Private
router.post(
  '/',
  [
    auth,
    [
      check('name', 'Name is required')
        .not()
        .isEmpty(),
    ],
  ],
  contrl.createPost
);

// @route     PUT api/contacts/:id
// @desc      Update contact
// @access    Private
router.put('/:id', auth, contrl.updatePost);

// @route     DELETE api/contacts/:id
// @desc      Delete contact
// @access    Private
router.delete('/:id', auth, contrl.deletePost);

// @route     get api/contacts/:id
// @desc      Get single contact
// @access    Private
router.get('/:id', auth, contrl.getSinglePost);

module.exports = router;
