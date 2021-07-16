const { validationResult } = require('express-validator');

const User = require('../models/User');
const Post = require('../models/Post');

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ "admin": false }).sort({
      date: -1,
    });
    res.json({ status_code: 200, success: true, users });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
}


// Delete user
const deleteUser = async (req, res) => {
  try {
    let user = await User.findById(req.params.id);

    if (!user) return res.status(404).json({ status_code: 404, success: false, msg: 'User not found' });

    // // Make sure user owns user
    // if (user.user_id.toString() !== req.user.id) {
    //   return res.status(401).json({status_code : 401,success:false, msg: 'Not authorized' });
    // }

    await User.findByIdAndRemove(req.params.id);

    res.json({ success: true, msg: 'User removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Update user
const updateUser = async (req, res) => {
  const { admin, isBlocked } = req.body;
  try {
    let user = await User.findById(req.params.id);

    if (!user) return res.status(404).json({ status_code: 404, success: false, msg: 'User not found' });

    user = await User.findByIdAndUpdate(
      req.params.id,
      {
        "isBlocked": isBlocked != undefined && isBlocked,
        "admin": admin != undefined && admin
      },
      { new: true },
    );
    updateAllPost(req.params.id, isBlocked);
    res.json({ status_code: 204, success: true, user });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

const updateAllPost = async (id, isBlocked) => {

  try {
    let posts = await Post.find({user_id: id});

    if (!posts) return;

     await Post.update({user_id: id},{userBlocked : isBlocked} , {multi: true});
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }

}



// Get single user
const getSingleUser = async (req, res) => {
  try {
    let user = await User.findById(req.params.id);

    if (!user) return res.status(404).json({ status_code: 404, success: false, msg: 'User not found' });
    // // Make sure user owns user
    // if (user.user_id.toString() !== req.user.id) {
    //   return res.status(401).json({status_code : 401,success:false, msg: 'Not authorized' });
    // }

    user = await User.findById(req.params.id);

    res.json({ success: true, user });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

module.exports = {
  getAllUsers,
  deleteUser,
  updateUser,
  getSingleUser
}