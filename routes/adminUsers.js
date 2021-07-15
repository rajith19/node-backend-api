const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const authorizeRoles = require('../middleware/adminAuth');
const { check } = require('express-validator');

const adminUserController = require('../controllers/adminUser');


// @route     GET api/admin/users/all
// @desc      Get all posts of a user
// @access    Private
router.get('/all', [auth, authorizeRoles('admin')], adminUserController.getAllUsers);

// @route     PUT api/admin/users/:id
// @desc      Update user
// @access    Private
router.put('/:id', [auth, authorizeRoles('admin')], adminUserController.updateUser);

// @route     DELETE api/admin/users/:id
// @desc      Delete user
// @access    Private
router.delete('/:id', [auth, authorizeRoles('admin')], adminUserController.deleteUser);

// @route     get api/admin/users/:id
// @desc      Get single user
// @access    Private
router.get('/:id', [auth, authorizeRoles('admin')], adminUserController.getSingleUser);

module.exports = router;
