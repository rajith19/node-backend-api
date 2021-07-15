const { validationResult } = require('express-validator');

const Post = require('../models/Post');

// Get all posts
const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find({}).sort({
      date: -1,
    });
    res.json({status_code : 200,success: true,posts});
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
}


// Delete post
const deletePost = async (req, res) => {
  try {
    let post = await Post.findById(req.params.id);

    if (!post) return res.status(404).json({status_code : 404,success:false, msg: 'Post not found' });

    // // Make sure user owns post
    // if (post.user_id.toString() !== req.user.id) {
    //   return res.status(401).json({status_code : 401,success:false, msg: 'Not authorized' });
    // }

    await Post.findByIdAndRemove(req.params.id);

    res.json({success:true, msg: 'Post removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Update post
const updatePost = async (req, res) => {
  const { isApproved } = req.body;
  try {
    let post = await Post.findById(req.params.id);

    if (!post) return res.status(404).json({status_code : 404,success:false, msg: 'Post not found' });

      post = await Post.findByIdAndUpdate(
      req.params.id,
      { "isApproved": isApproved },
      { new: true },
    );


    res.json({status_code: 204 , success:true, post});
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Get single post
const getSinglePost = async (req, res) => {
  try {
    let post = await Post.findById(req.params.id);

    if (!post) return res.status(404).json({status_code : 404,success:false, msg: 'Post not found' });
    // Make sure user owns post
    if (post.user_id.toString() !== req.user.id) {
      return res.status(401).json({status_code : 401,success:false, msg: 'Not authorized' });
    }

    post = await Post.findById(req.params.id);

    res.json({success:true, post});
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};;

module.exports = {
  getAllPosts,
  deletePost,
  updatePost,
  getSinglePost
}