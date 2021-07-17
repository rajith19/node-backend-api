const { validationResult } = require('express-validator');

const Order = require('../models/Order');
const moment = require('moment-timezone');
const { now } = require('mongoose');
var nodemailer = require('nodemailer');
const timeInSec = moment().endOf('day').valueOf()
const Interval = timeInSec - Date.now();

// setInterval(async ()=>{
//   const createOrder =async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }

//     const { check } = req.body;
//     try {
//       const newPost = new Order({
//         buyerUser_id: req.user.id,
//         date: ""
//       });

//       const order = await newPost.save();

//       res.json({status_code : 201,success: true, order});
//     } catch (err) {
//       console.error(err.message);
//       res.status(500).send('Server Error');
//     }
//   };

//   // var transporter = nodemailer.createTransport({
//   //   service: 'gmail',
//   //   auth: {
//   //     user: 'rvg0627@gmail.com',
//   //     pass: 'dragoon007'
//   //   }
//   // });

//   // var mailOptions = {
//   //   from: 'rvg0627@gmail.com',
//   //   to: 'rajithvgopalm@gmail.com',
//   //   subject: 'Sending Email using Node.js',
//   //   text: 'That was easy!'
//   // };

//   // transporter.sendMail(mailOptions, function(error, info){
//   //   if (error) {
//   //     console.log(error);
//   //   } else {
//   //     console.log('Email sent: ' + info.response);
//   //   }
//   // });
// },Interval);

// Create post
const createOrder = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  console.log(Interval);
  const { productName, description, date, post_id, postedBy, posterEmail, buyerUser_id, buyerName, buyerEmail, orderStatus } = req.body;
  try {
    const newPost = new Order({
      buyerUser_id: req.user.id,
      productName, description, date, post_id, postedBy, posterEmail, buyerName, buyerEmail, orderStatus
    });

    const order = await newPost.save();

    res.json({ status_code: 201, success: true, order });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};


module.exports = {

  createOrder,

}