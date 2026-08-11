const { query } = require('../config/database');

// @desc Get all spiritual circuits with destinations in sequence order
// @route GET /api/spiritual-circuits
exports.getCircuits = async (req, res, next) => {
  try {
    const circuits = await query('SELECT * FROM spiritual_circuits ORDER BY id ASC');

    const result = await Promise.all(
      circuits.map(async (c) => {
        const stops = await query(
          `SELECT d.id, d.name, d.city, s.name AS state_name, cd.sequence_number
           FROM circuit_destinations cd
           JOIN destinations d ON cd.destination_id = d.id
           JOIN states s ON d.state_id = s.id
           WHERE cd.circuit_id = ?
           ORDER BY cd.sequence_number ASC`,
          [c.id]
        );

        return {
          id: c.id,
          name: c.name,
          description: c.description,
          duration: c.duration,
          bestSeason: c.best_season,
          image: c.image_url,
          stops: stops.map((s) => ({ id: s.id, name: s.name, state: s.state_name, sequence: s.sequence_number }))
        };
      })
    );

    res.status(200).json({ success: true, count: result.length, data: result });
  } catch (error) {
    next(error);
  }
};

// @desc Get circuit details by ID
// @route GET /api/spiritual-circuits/:id
exports.getCircuitById = async (req, res, next) => {
  try {
    const circuits = await query('SELECT * FROM spiritual_circuits WHERE id = ?', [req.params.id]);
    if (circuits.length === 0) {
      return res.status(404).json({ success: false, message: 'Spiritual circuit not found' });
    }

    const c = circuits[0];
    const stops = await query(
      `SELECT d.id, d.name, d.city, d.description, s.name AS state_name, cd.sequence_number
       FROM circuit_destinations cd
       JOIN destinations d ON cd.destination_id = d.id
       JOIN states s ON d.state_id = s.id
       WHERE cd.circuit_id = ?
       ORDER BY cd.sequence_number ASC`,
      [c.id]
    );

    res.status(200).json({
      success: true,
      data: {
        id: c.id,
        name: c.name,
        description: c.description,
        duration: c.duration,
        bestSeason: c.best_season,
        image: c.image_url,
        stops
      }
    });
  } catch (error) {
    next(error);
  }
};
