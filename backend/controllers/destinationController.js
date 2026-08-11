const { query } = require('../config/database');

// @desc Get list of destinations with search, filters, pagination
// @route GET /api/destinations
exports.getDestinations = async (req, res, next) => {
  try {
    const { search, state, category, budget, bestTime, page = 1, limit = 20 } = req.query;

    const offset = (parseInt(page, 10) - 1) * parseInt(limit, 10);
    const params = [];
    let whereClauses = [];

    if (search) {
      whereClauses.push('(d.name LIKE ? OR d.city LIKE ? OR d.description LIKE ?)');
      params.push(`%${search}%`, `%${search}%`, `%${search}%`);
    }

    if (state) {
      whereClauses.push('(s.name = ? OR s.name LIKE ?)');
      params.push(state, `%${state}%`);
    }

    if (budget) {
      whereClauses.push('d.average_budget <= ?');
      params.push(parseInt(budget, 10));
    }

    if (bestTime) {
      whereClauses.push('d.best_time LIKE ?');
      params.push(`%${bestTime}%`);
    }

    let sql = `
      SELECT DISTINCT d.id, d.name, d.city, d.description, d.average_budget, d.recommended_days,
             d.best_time, d.rating, d.image_url, s.name AS state_name, s.type AS state_type
      FROM destinations d
      JOIN states s ON d.state_id = s.id
    `;

    if (category) {
      sql += `
        JOIN destination_categories dc ON d.id = dc.destination_id
        JOIN categories c ON dc.category_id = c.id
      `;
      whereClauses.push('c.name = ?');
      params.push(category);
    }

    if (whereClauses.length > 0) {
      sql += ' WHERE ' + whereClauses.join(' AND ');
    }

    const validLimit = Math.max(1, parseInt(limit, 10) || 20);
    const validOffset = Math.max(0, ((parseInt(page, 10) || 1) - 1) * validLimit);

    sql += ' ORDER BY d.rating DESC, d.name ASC LIMIT ? OFFSET ?';
    params.push(validLimit, validOffset);

    const destinations = await query(sql, params);

    res.status(200).json({
      success: true,
      count: destinations.length,
      page: parseInt(page, 10),
      data: destinations.map((d) => ({
        id: d.id,
        name: d.name,
        state: d.state_name,
        city: d.city,
        description: d.description,
        avgBudgetPerDay: d.average_budget,
        recommendedDays: d.recommended_days,
        bestSeason: d.best_time,
        rating: parseFloat(d.rating),
        heroImage: d.image_url
      }))
    });
  } catch (error) {
    next(error);
  }
};

// @desc Get single destination details by ID
// @route GET /api/destinations/:id
exports.getDestinationById = async (req, res, next) => {
  try {
    const destId = req.params.id;

    const sql = `
      SELECT d.*, s.name AS state_name, s.type AS state_type
      FROM destinations d
      JOIN states s ON d.state_id = s.id
      WHERE d.id = ? OR d.name = ?
    `;

    const destinations = await query(sql, [destId, destId]);

    if (destinations.length === 0) {
      return res.status(404).json({ success: false, message: 'Destination not found' });
    }

    const d = destinations[0];

    // Fetch related detail datasets
    const attractions = await query('SELECT id, name, description, image_url, entry_fee, recommended_duration FROM attractions WHERE destination_id = ?', [d.id]);
    const activities = await query('SELECT id, name, description, estimated_cost, duration FROM activities WHERE destination_id = ?', [d.id]);
    const transport = await query('SELECT id, transport_type, name, estimated_cost, travel_time, description, recommended FROM transport_options WHERE destination_id = ?', [d.id]);
    const foods = await query('SELECT id, name, description, image_url FROM foods WHERE destination_id = ?', [d.id]);

    res.status(200).json({
      success: true,
      data: {
        id: d.id,
        name: d.name,
        state: d.state_name,
        city: d.city,
        description: d.description,
        avgBudgetPerDay: d.average_budget,
        recommendedDays: d.recommended_days,
        bestSeason: d.best_time,
        rating: parseFloat(d.rating),
        heroImage: d.image_url,
        topAttractions: attractions.map((a) => ({ name: a.name, desc: a.description, image: a.image_url })),
        thingsToDo: activities.map((act) => act.name),
        transport: transport[0] ? {
          primary: transport[0].name,
          estimatedCost: transport[0].estimated_cost,
          description: transport[0].description
        } : null,
        localFood: foods.map((f) => ({ name: f.name, desc: f.description }))
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc Get destination attractions
// @route GET /api/destinations/:id/attractions
exports.getAttractions = async (req, res, next) => {
  try {
    const attractions = await query('SELECT * FROM attractions WHERE destination_id = ?', [req.params.id]);
    res.status(200).json({ success: true, count: attractions.length, data: attractions });
  } catch (error) {
    next(error);
  }
};

// @desc Get destination activities
// @route GET /api/destinations/:id/activities
exports.getActivities = async (req, res, next) => {
  try {
    const activities = await query('SELECT * FROM activities WHERE destination_id = ?', [req.params.id]);
    res.status(200).json({ success: true, count: activities.length, data: activities });
  } catch (error) {
    next(error);
  }
};

// @desc Get destination transport options
// @route GET /api/destinations/:id/transport
exports.getTransport = async (req, res, next) => {
  try {
    const transport = await query('SELECT * FROM transport_options WHERE destination_id = ?', [req.params.id]);
    res.status(200).json({ success: true, count: transport.length, data: transport });
  } catch (error) {
    next(error);
  }
};

// @desc Get destination local food
// @route GET /api/destinations/:id/food
exports.getFood = async (req, res, next) => {
  try {
    const foods = await query('SELECT * FROM foods WHERE destination_id = ?', [req.params.id]);
    res.status(200).json({ success: true, count: foods.length, data: foods });
  } catch (error) {
    next(error);
  }
};
