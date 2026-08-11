const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { query } = require('../config/database');

const generateToken = (userId, email) => {
  return jwt.sign(
    { id: userId, email },
    process.env.JWT_SECRET || 'bharat_yatra_secret_key_2026',
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  );
};

// @desc Register new user
// @route POST /api/auth/register
exports.register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide name, email, and password.' });
    }

    // Check if user already exists
    const existingUsers = await query('SELECT id FROM users WHERE email = ?', [email]);
    if (existingUsers.length > 0) {
      return res.status(409).json({ success: false, message: 'User with this email already exists.' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // Insert user
    const result = await query(
      'INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)',
      [name, email, passwordHash]
    );

    const userId = result.insertId;
    const token = generateToken(userId, email);

    res.status(201).json({
      success: true,
      message: 'User registered successfully!',
      token,
      data: {
        id: userId,
        name,
        email,
        profile_image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop'
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc Login user
// @route POST /api/auth/login
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide email and password.' });
    }

    // Find user
    const users = await query('SELECT * FROM users WHERE email = ?', [email]);
    if (users.length === 0) {
      return res.status(401).json({ success: false, message: 'Invalid email or password.' });
    }

    const user = users[0];

    // Check password
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid email or password.' });
    }

    const token = generateToken(user.id, user.email);

    res.status(200).json({
      success: true,
      message: 'Login successful!',
      token,
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        profile_image: user.profile_image
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc Get current user details
// @route GET /api/auth/me
exports.getMe = async (req, res, next) => {
  try {
    const users = await query('SELECT id, name, email, profile_image, created_at FROM users WHERE id = ?', [req.user.id]);
    if (users.length === 0) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }

    res.status(200).json({
      success: true,
      data: users[0]
    });
  } catch (error) {
    next(error);
  }
};

// @desc Logout user
// @route POST /api/auth/logout
exports.logout = async (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Logged out successfully.'
  });
};
