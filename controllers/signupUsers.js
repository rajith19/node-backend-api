const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

const User = require('../models/User');

const registerUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({status_code : 400, success:false,errors: errors.array() });
  }

  const { name, email, password, admin, isBlocked } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({status_code : 400,success:false, msg: 'User already exists' });
    }

    user = new User({
      name,
      email,
      password,
      admin,
      isBlocked
    });

    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const payload = {
      user: {
        id: user.id,
        admin: user.admin,
        isBlocked : user.isBlocked
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
        res.json({ "success": true, token });
      },
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};


module.exports = {
  registerUser
};
