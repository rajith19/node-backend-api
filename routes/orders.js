const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {check} = require('express-validator');

const orderController = require('../controllers/orders');


// @route     POST api/orders
// @desc      Add new order
// @access    Private
router.post(
  '/',auth,orderController.createOrder
);


// @route     GET api/orders/all
// @desc      Get all orders
// @access    Private
router.get(
  '/all',auth,orderController.getAllOrder
);


// @route     GET api/orders/:id
// @desc      Get single order
// @access    Private
router.get(
  '/:id',auth,orderController.getSingleOrder
);


module.exports = router;
