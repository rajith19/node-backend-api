const { validationResult } = require('express-validator');

const Post = require('../models/Post');

// Get All posts
const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find({ user: req.user.id }).sort({
            date: -1,
        });
        res.json(posts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}

// Create post
const createPost = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, description, image, location } = req.body;

    try {
        const newPost = new Post({
            name,
            description, 
            image, 
            location,
            user_id: req.user.id,
        });

        const post = await newPost.save();

        res.json(post);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Delete post
const deletePost = async (req, res) => {
    try {
      let post = await Post.findById(req.params.id);
  
      if (!post) return res.status(404).json({msg: 'Post not found'});
  
      // Make sure user owns post
      if (post.user.toString() !== req.user.id) {
        return res.status(401).json({msg: 'Not authorized'});
      }
  
      await Post.findByIdAndRemove(req.params.id);
  
      res.json({msg: 'Post removed'});
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  };

  // Update post
const updatePost = async (req, res) => {
    const {name, description, image, location} = req.body;
    // Build post object
    const postFields = {};
    if (name) postFields.name = name;
    if (description) postFields.description = description;
    if (image) postFields.image = image;
    if (location) postFields.location = location;
  
    try {
      let post = await Post.findById(req.params.id);
  
      if (!post) return res.status(404).json({msg: 'Post not found'});
  
      // Make sure user owns post
      if (post.user.toString() !== req.user.id) {
        return res.status(401).json({msg: 'Not authorized'});
      }
  
      post = await Post.findByIdAndUpdate(
        req.params.id,
        {$set: postFields},
        {new: true},
      );
  
      res.json(post);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  };

// Get single post
const getSinglePost = async (req, res) => {
    try {
      let post = await Post.findById(req.params.id);
  
      if (!post) return res.status(404).json({msg: 'Post not found'});
  
      // Make sure user owns post
      if (post.user.toString() !== req.user.id) {
        return res.status(401).json({msg: 'Not authorized'});
      }
  
    post =  await Post.findById(req.params.id);
  
      res.json(post);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  };;

module.exports = {
    getAllPosts,
    createPost,
    deletePost,
    updatePost,
    getSinglePost
}