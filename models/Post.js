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
  postedByName:{
    type:String,
  },
  postedByEmail:{
    type:String
  },
  ordered : {
    type:Boolean
  },
  userBlocked : {
    type: Boolean,
    default : false
  }
});

module.exports = mongoose.model('post', PostSchema);
