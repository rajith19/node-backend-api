const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
  },
  image: {
    type: String
  },
  location: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now
  },
  isApproved : {
    type: Boolean,
    default : false
  },
  postBy:{
    type:String,
  },
  email:{
    type:String
  }
});

module.exports = mongoose.model('post', PostSchema);
