const { query } = require('../config/database');

// @desc Get user wishlist
// @route GET /api/wishlist
exports.getWishlist = async (req, res, next) => {
  try {
    const items = await query(
      `SELECT w.id AS wishlist_id, w.created_at, d.id, d.name, d.city, d.average_budget,
              d.recommended_days, d.best_time, d.rating, d.image_url, s.name AS state_name
       FROM wishlist w
       JOIN destinations d ON w.destination_id = d.id
       JOIN states s ON d.state_id = s.id
       WHERE w.user_id = ?
       ORDER BY w.created_at DESC`,
      [req.user.id]
    );

    res.status(200).json({
      success: true,
      count: items.length,
      data: items.map((item) => ({
        id: item.id,
        name: item.name,
        state: item.state_name,
        city: item.city,
        avgBudgetPerDay: item.average_budget,
        recommendedDays: item.recommended_days,
        bestSeason: item.best_time,
        rating: parseFloat(item.rating),
        heroImage: item.image_url
      }))
    });
  } catch (error) {
    next(error);
  }
};

// @desc Add destination to wishlist
// @route POST /api/wishlist
exports.addToWishlist = async (req, res, next) => {
  try {
    const { destinationId } = req.body;

    if (!destinationId) {
      return res.status(400).json({ success: false, message: 'destinationId is required.' });
    }

    // Check if destination exists
    const dest = await query('SELECT id FROM destinations WHERE id = ?', [destinationId]);
    if (dest.length === 0) {
      return res.status(404).json({ success: false, message: 'Destination not found.' });
    }

    // Check duplicate
    const existing = await query(
      'SELECT id FROM wishlist WHERE user_id = ? AND destination_id = ?',
      [req.user.id, destinationId]
    );

    if (existing.length > 0) {
      return res.status(409).json({ success: false, message: 'Destination already in wishlist.' });
    }

    await query(
      'INSERT INTO wishlist (user_id, destination_id) VALUES (?, ?)',
      [req.user.id, destinationId]
    );

    res.status(201).json({
      success: true,
      message: 'Destination added to wishlist!'
    });
  } catch (error) {
    next(error);
  }
};

// @desc Remove destination from wishlist
// @route DELETE /api/wishlist/:destinationId
exports.removeFromWishlist = async (req, res, next) => {
  try {
    const { destinationId } = req.params;

    const result = await query(
      'DELETE FROM wishlist WHERE user_id = ? AND destination_id = ?',
      [req.user.id, destinationId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Wishlist entry not found.' });
    }

    res.status(200).json({
      success: true,
      message: 'Destination removed from wishlist.'
    });
  } catch (error) {
    next(error);
  }
};
