const { validationResult } = require('express-validator');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');;


const getLoggedInUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
}

// Update user
const updateUser = async (req, res) => {
  const { name, description, image, location } = req.body;
  // Build user object
  const postFields = {};
  if (name) postFields.name = name;
  if (description) postFields.description = description;
  if (image) postFields.image = image;
  if (location) postFields.location = location;

  try {
    let user = await User.findById(req.params.id);

    if (!user) return res.status(404).json({ status_code: 404, success: false, msg: 'User not found' });

    // Make sure user owns user
    if (user.user_id.toString() !== req.user.id) {
      return res.status(401).json({ status_code: 401, success: false, msg: 'Not authorized' });
    }

    user = await User.findByIdAndUpdate(
      req.params.id,
      { $set: postFields },
      { new: true },
    );

    res.json({ success: true, user });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

const authUserGetToken = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ status_code: 400, success: false, msg: 'Invalid Credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ status_code: 400, success: false, msg: 'Invalid Credentials' });
    }

    const payload = {
      user: {
        id: user.id,
        admin: user.admin
      },
    };

    jwt.sign(
      payload,
      process.env.jwtSecret,
      {
        expiresIn: 360000,
      },
      (err, token) => {
        if (err) throw err;
        res.json({ success: true, token });
      },
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

module.exports = {
  getLoggedInUser,
  authUserGetToken
}