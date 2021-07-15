const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {check} = require('express-validator');

const postController = require('../controllers/posts');


// @route     GET api/posts
// @desc      Get all posts of a user
// @access    Private
router.get('/all', auth, postController.getAllPosts);


// @route     GET api/posts
// @desc      Get all posts of a user
// @access    Private
router.get('/', auth, postController.getAllPostsPerUser);

// @route     POST api/posts
// @desc      Add new post
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
  postController.createPost
);

// @route     PUT api/posts/:id
// @desc      Update post
// @access    Private
router.put('/:id', auth, postController.updatePost);

// @route     DELETE api/posts/:id
// @desc      Delete post
// @access    Private
router.delete('/:id', auth, postController.deletePost);

// @route     get api/posts/:id
// @desc      Get single contact
// @access    Private
router.get('/:id', auth, postController.getSinglePost);

module.exports = router;
