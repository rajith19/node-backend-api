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


module.exports = router;
