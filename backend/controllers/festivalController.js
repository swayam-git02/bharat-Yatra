const { query } = require('../config/database');

// @desc Get all Indian festivals
// @route GET /api/festivals
exports.getFestivals = async (req, res, next) => {
  try {
    const sql = `
      SELECT f.*, s.name AS state_name
      FROM festivals f
      LEFT JOIN states s ON f.state_id = s.id
      ORDER BY f.id ASC
    `;
    const festivals = await query(sql);

    res.status(200).json({
      success: true,
      count: festivals.length,
      data: festivals.map((f) => ({
        id: f.id,
        name: f.name,
        description: f.description,
        startDate: f.start_date,
        endDate: f.end_date,
        state: f.state_name,
        image: f.image_url
      }))
    });
  } catch (error) {
    next(error);
  }
};

// @desc Get festival by ID
// @route GET /api/festivals/:id
exports.getFestivalById = async (req, res, next) => {
  try {
    const festivals = await query('SELECT * FROM festivals WHERE id = ?', [req.params.id]);
    if (festivals.length === 0) {
      return res.status(404).json({ success: false, message: 'Festival not found' });
    }
    res.status(200).json({ success: true, data: festivals[0] });
  } catch (error) {
    next(error);
  }
};
