const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register user
exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  
  try {
    const user = new User({ name, email, password });
    await user.save();

    const payload = { user: { id: user.id, mailid: user.email, name: user.name } };
    const token = jwt.sign(payload, 'Mishra@@1234', { expiresIn: '1h' });

    res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'Strict' });
    res.status(201).json({ message: "User registered successfully" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Login user
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

    const payload = { user: { id: user.id, mailid: user.email, name: user.name } };
    const token = jwt.sign(payload, 'Mishra@@1234', { expiresIn: '1h' });

    res.cookie('token', token, { httpOnly: true, secure: true });
    res.status(200).json({ message: "Logged in successfully" });
  
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
