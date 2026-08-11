const { query } = require('../config/database');

// @desc Get user notifications
// @route GET /api/notifications
exports.getNotifications = async (req, res, next) => {
  try {
    const notifications = await query(
      'SELECT id, title, message, type, is_read, created_at FROM notifications WHERE user_id = ? ORDER BY created_at DESC',
      [req.user.id]
    );

    res.status(200).json({
      success: true,
      count: notifications.length,
      data: notifications
    });
  } catch (error) {
    next(error);
  }
};
