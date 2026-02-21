const User = require("../models/User");
const jwt = require("jsonwebtoken");

const generateToken = (user) =>
  jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

exports.register = async (req, res) => {
  const user = await User.create(req.body);
  const token = generateToken(user);

  res.json({ token, user: user.toJSON() });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user || !(await user.comparePassword(password)))
    return res.status(401).json({ message: "Invalid credentials" });

  user.lastLogin = new Date();
  await user.save();

  const token = generateToken(user);

  res.json({ token, user: user.toJSON() });
};

exports.profile = (req, res) => {
  res.json(req.user);
};