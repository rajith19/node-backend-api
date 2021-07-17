const mongoose = require('mongoose');

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
  postedByName: {
    type: String
  },
  postedByEmail: {
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
