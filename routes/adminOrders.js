const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const authorizeRoles = require('../middleware/adminAuth');
const { check } = require('express-validator');

const adminOrderController = require('../controllers/adminOrder');


// @route     GET api/admin/orders/all
// @desc      Get all orders of a user
// @access    Private
router.get('/all', [auth, authorizeRoles('admin')], adminOrderController.getAllOrders);

// @route     PUT api/admin/orders/:id
// @desc      Update order
// @access    Private
router.put('/:id', [auth, authorizeRoles('admin')], adminOrderController.updateOrder);

// @route     DELETE api/admin/orders/:id
// @desc      Delete order
// @access    Private
router.delete('/:id', [auth, authorizeRoles('admin')], adminOrderController.deleteOrder);

// // @route     get api/admin/orders/:id
// // @desc      Get single order
// // @access    Private
// router.get('/:id', [auth, authorizeRoles('admin')], adminOrderController.getSinglePost);

module.exports = router;
