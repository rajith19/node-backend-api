const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const authorizeRoles = require('../middleware/adminAuth');
const { check } = require('express-validator');

const adminPostController = require('../controllers/adminPost');


// @route     GET api/admin/posts/all
// @desc      Get all posts of a user
// @access    Private
router.get('/all', [auth, authorizeRoles('admin')], adminPostController.getAllPosts);

// @route     PUT api/admin/posts/:id
// @desc      Update post
// @access    Private
router.put('/:id', [auth, authorizeRoles('admin')], adminPostController.updatePost);

// @route     DELETE api/admin/posts/:id
// @desc      Delete post
// @access    Private
router.delete('/:id', [auth, authorizeRoles('admin')], adminPostController.deletePost);

// @route     get api/admin/posts/:id
// @desc      Get single post
// @access    Private
router.get('/:id', [auth, authorizeRoles('admin')], adminPostController.getSinglePost);

module.exports = router;
