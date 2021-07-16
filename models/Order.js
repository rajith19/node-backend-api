const mongoose = require('mongoose');

const OrderSchema = mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },
  name: {
    type: String,
    required: true,
    ref: 'posts'
  },
  description: {
    type: String,
    ref: 'posts'
  },
  image: {
    type: String,
    ref: 'posts'
  },
  location: {
    type: String,
    ref: 'posts'
  },
  date: {
    type: Date,
    default: Date.now
  },
  postBy:{
    type:String,
    ref: 'posts'
  },
  email:{
    type:String,
    ref: 'posts'
  }
});

module.exports = mongoose.model('order', OrderSchema);
