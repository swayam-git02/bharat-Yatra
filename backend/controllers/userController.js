const { query } = require('../config/database');

// @desc Get user profile & preferences
// @route GET /api/users/profile
exports.getUserProfile = async (req, res, next) => {
  try {
    const users = await query(
      'SELECT id, name, email, profile_image, created_at FROM users WHERE id = ?',
      [req.user.id]
    );

    if (users.length === 0) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }

    const preferences = await query(
      'SELECT travel_style, budget_preference FROM user_preferences WHERE user_id = ?',
      [req.user.id]
    );

    res.status(200).json({
      success: true,
      data: {
        ...users[0],
        preferences: preferences[0] || { travel_style: 'Balanced', budget_preference: 15000 }
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc Update user profile
// @route PUT /api/users/profile
exports.updateUserProfile = async (req, res, next) => {
  try {
    const { name, profile_image } = req.body;

    await query(
      'UPDATE users SET name = COALESCE(?, name), profile_image = COALESCE(?, profile_image) WHERE id = ?',
      [name, profile_image, req.user.id]
    );

    const updated = await query('SELECT id, name, email, profile_image FROM users WHERE id = ?', [req.user.id]);

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully!',
      data: updated[0]
    });
  } catch (error) {
    next(error);
  }
};

// @desc Update user travel preferences
// @route PUT /api/users/preferences
exports.updateUserPreferences = async (req, res, next) => {
  try {
    const { travel_style, budget_preference } = req.body;

    await query(
      `INSERT INTO user_preferences (user_id, travel_style, budget_preference)
       VALUES (?, ?, ?)
       ON CONFLICT(user_id) DO UPDATE SET
       travel_style = excluded.travel_style,
       budget_preference = excluded.budget_preference`,
      [req.user.id, travel_style, budget_preference]
    );

    res.status(200).json({
      success: true,
      message: 'Preferences updated successfully!'
    });
  } catch (error) {
    next(error);
  }
};
