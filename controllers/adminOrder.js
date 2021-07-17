const { validationResult } = require('express-validator');

const Order = require('../models/Order');

// Get all orders
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({}).sort({
      date: -1,
    });

    res.json({status_code : 200,success: true,orders});
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
}


// Delete order
const deleteOrder = async (req, res) => {
  try {
    let order = await Order.findById(req.params.id);

    if (!order) return res.status(404).json({status_code : 404,success:false, msg: 'Order not found' });

    await Order.findByIdAndRemove(req.params.id);

    res.json({success:true, msg: 'Order removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Update order
const updateOrder = async (req, res) => {
  const { isApproved } = req.body;
  try {
    let order = await Order.findById(req.params.id);

    if (!order) return res.status(404).json({status_code : 404,success:false, msg: 'Order not found' });

      order = await Order.findByIdAndUpdate(
      req.params.id,
      { "isApproved": isApproved },
      { new: true },
    );
    res.json({status_code: 204 , success:true, order});
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Get single order
const getSingleOrder = async (req, res) => {
  try {
    let order = await Order.findById(req.params.id);

    if (!order) return res.status(404).json({status_code : 404,success:false, msg: 'Order not found' });

    order = await Order.findById(req.params.id);

    res.json({success:true, order});
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};;

module.exports = {
  getAllOrders,
  deleteOrder,
  updateOrder,
  getSingleOrder
}