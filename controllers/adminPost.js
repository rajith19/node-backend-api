const { validationResult } = require('express-validator');
var nodemailer = require('nodemailer');
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
  console.log(req.body);
  try {
    let post = await Post.findById(req.params.id);
    console.log(post);
    if (!post) return res.status(404).json({status_code : 404,success:false, msg: 'Post not found' });

      post = await Post.findByIdAndUpdate(
      req.params.id,
      { "isApproved": isApproved },
      { new: true },
    );

    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.email,
        pass: process.env.password
      }
    });
  
    var mailOptions = {
      from: "Feed the Need <rvg0627@gmail.com>",
      to: post.postedByEmail,
      subject: isApproved ? 'Post Approved!' : "Post Disapproved",
      text: isApproved ? `Your Post has been approved.` : "Your post has been disapproved"
    };
  
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });


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
    // if (post.user_id.toString() !== req.user.id) {
    //   return res.status(401).json({status_code : 401,success:false, msg: 'Not authorized' });
    // }

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