const User = require('../models/User')
const { generateToken } = require('../config/jwt');

exports.register = async (req, res, next) => {
  try {
    const { email, password, firstName, lastName, role } = req.body;
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' });
    }

    const user = new User({ 
      email: email.toLowerCase(), 
      firstName, 
      lastName, 
      role: role || 'user' 
    });
    
    const registeredUser = await User.register(user, password);
    const token = generateToken({ id: registeredUser._id, role: registeredUser.role });
    
    res.status(201).json({
      token,
      user: registeredUser.toJSON()
    });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const token = generateToken({ id: req.user._id, role: req.user.role });
    req.user.lastLogin = new Date();
    await req.user.save();
    
    res.json({
      token,
      user: req.user.toJSON()
    });
  } catch (error) {
    next(error);
  }
};

exports.profile = async (req, res) => {
  res.json(req.user.toJSON());
};
