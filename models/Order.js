const mongoose = require('mongoose');
var moment = require('moment-timezone');
moment().tz("America/Los_Angeles").format();
const OrderSchema = mongoose.Schema({

  productName: {
    type: String,
  },
  description: {
    type: String
  },
  date: {
    type: Date,
  },
  post_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'posts'
  },
  postedBy: {
    type: String
  },
  posterEmail: {
    type: String
  },
  buyerUser_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },
  buyerName: {
    type: String
  },
  buyerEmail: {
    type: String
  },
  orderStatus: {
    type: String
  }
});

module.exports = mongoose.model('order', OrderSchema);
