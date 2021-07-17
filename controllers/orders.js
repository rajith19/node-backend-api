const { validationResult } = require('express-validator');

const Order = require('../models/Order');
const moment = require('moment-timezone');
const canadEastern = moment.tz(Date.now(), "Asia/Kolkata");

const timeInSec = moment().endOf('day').valueOf()
const Interval = timeInSec -Date.now();


setInterval(async ()=>{
  const createOrder = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    console.log("canad", canadEastern)
  
    const { check } = req.body;
    try {
      const newPost = new Order({
        buyerUser_id: req.user.id,
        date: canadEastern
      });
  
      const order = await newPost.save();
  
      res.json({status_code : 201,success: true, order});
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  };
},Interval);

// Create post
const createOrder = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  console.log("canad", canadEastern)

  const { check } = req.body;
  try {
    const newPost = new Order({
      buyerUser_id: req.user.id,
      date: canadEastern
    });

    const order = await newPost.save();

    res.json({status_code : 201,success: true, order});
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};


module.exports = {
  
  createOrder,
 
}