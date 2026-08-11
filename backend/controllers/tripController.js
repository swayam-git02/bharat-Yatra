const { query, pool } = require('../config/database');

// @desc Save frontend-generated itinerary to MySQL database
// @route POST /api/trips
exports.createTrip = async (req, res, next) => {
  const connection = await pool.getConnection();
  try {
    const { tripName, destinationId, duration, budget, travelStyle, interests, days } = req.body;

    if (!tripName || !destinationId) {
      return res.status(400).json({ success: false, message: 'tripName and destinationId are required.' });
    }

    await connection.beginTransaction();

    // 1. Insert saved_trip
    const [tripResult] = await connection.query(
      `INSERT INTO saved_trips (user_id, trip_name, destination_id, duration, budget, travel_style, interests)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [req.user.id, tripName, destinationId, duration || 3, budget || 10000, travelStyle || 'Friends', JSON.stringify(interests || [])]
    );

    const tripId = tripResult.insertId;

    // 2. Insert saved_trip_days & activities
    if (days && Array.isArray(days)) {
      for (const dayObj of days) {
        const [dayResult] = await connection.query(
          `INSERT INTO saved_trip_days (trip_id, day_number, date) VALUES (?, ?, ?)`,
          [tripId, dayObj.dayNumber || dayObj.day, dayObj.date || null]
        );

        const dayId = dayResult.insertId;

        if (dayObj.activities && Array.isArray(dayObj.activities)) {
          for (const act of dayObj.activities) {
            await connection.query(
              `INSERT INTO saved_trip_activities (trip_day_id, activity_name, description, time_slot, estimated_cost, transport)
               VALUES (?, ?, ?, ?, ?, ?)`,
              [dayId, act.activityName || act.title, act.description || act.desc, act.timeSlot || act.time, act.estimatedCost || act.cost || 0, act.transport || null]
            );
          }
        }
      }
    }

    await connection.commit();

    // Fetch full saved trip
    const [dest] = await query('SELECT name, image_url FROM destinations WHERE id = ?', [destinationId]);

    res.status(201).json({
      success: true,
      message: 'Itinerary saved successfully!',
      data: {
        id: tripId,
        title: tripName,
        destinationId,
        destinationName: dest ? dest.name : 'India Destination',
        image: dest ? dest.image_url : null,
        days: duration,
        budget,
        travelStyle,
        interests
      }
    });
  } catch (error) {
    await connection.rollback();
    next(error);
  } finally {
    connection.release();
  }
};

// @desc Get all saved trips for authenticated user
// @route GET /api/trips
exports.getUserTrips = async (req, res, next) => {
  try {
    const trips = await query(
      `SELECT t.*, d.name AS destination_name, d.image_url
       FROM saved_trips t
       JOIN destinations d ON t.destination_id = d.id
       WHERE t.user_id = ?
       ORDER BY t.created_at DESC`,
      [req.user.id]
    );

    res.status(200).json({
      success: true,
      count: trips.length,
      data: trips.map((t) => ({
        id: t.id,
        title: t.trip_name,
        destinationId: t.destination_id,
        destinationName: t.destination_name,
        days: t.duration,
        budget: t.budget,
        travelStyle: t.travel_style,
        interests: typeof t.interests === 'string' ? JSON.parse(t.interests) : t.interests,
        createdDate: t.created_at,
        image: t.image_url
      }))
    });
  } catch (error) {
    next(error);
  }
};

// @desc Get single trip by ID (with days & activities)
// @route GET /api/trips/:id
exports.getTripById = async (req, res, next) => {
  try {
    const trips = await query(
      `SELECT t.*, d.name AS destination_name, d.image_url
       FROM saved_trips t
       JOIN destinations d ON t.destination_id = d.id
       WHERE t.id = ? AND t.user_id = ?`,
      [req.params.id, req.user.id]
    );

    if (trips.length === 0) {
      return res.status(404).json({ success: false, message: 'Trip not found or unauthorized.' });
    }

    const t = trips[0];
    const tripDays = await query('SELECT * FROM saved_trip_days WHERE trip_id = ? ORDER BY day_number ASC', [t.id]);

    const structuredDays = await Promise.all(
      tripDays.map(async (d) => {
        const activities = await query('SELECT * FROM saved_trip_activities WHERE trip_day_id = ?', [d.id]);
        return {
          day: d.day_number,
          date: d.date,
          activities: activities.map((a) => ({
            id: a.id,
            time: a.time_slot,
            title: a.activity_name,
            desc: a.description,
            cost: a.estimated_cost,
            transport: a.transport
          }))
        };
      })
    );

    res.status(200).json({
      success: true,
      data: {
        id: t.id,
        title: t.trip_name,
        destinationId: t.destination_id,
        destinationName: t.destination_name,
        days: t.duration,
        budget: t.budget,
        travelStyle: t.travel_style,
        interests: typeof t.interests === 'string' ? JSON.parse(t.interests) : t.interests,
        image: t.image_url,
        itineraryDays: structuredDays
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc Public share read-only endpoint for shared trips
// @route GET /api/trips/public/:id
exports.getPublicTrip = async (req, res, next) => {
  try {
    const trips = await query(
      `SELECT t.id, t.trip_name, t.duration, t.budget, t.travel_style, t.interests, d.name AS destination_name, d.image_url
       FROM saved_trips t
       JOIN destinations d ON t.destination_id = d.id
       WHERE t.id = ?`,
      [req.params.id]
    );

    if (trips.length === 0) {
      return res.status(404).json({ success: false, message: 'Shared trip not found.' });
    }

    const t = trips[0];
    const tripDays = await query('SELECT * FROM saved_trip_days WHERE trip_id = ? ORDER BY day_number ASC', [t.id]);

    const structuredDays = await Promise.all(
      tripDays.map(async (d) => {
        const activities = await query('SELECT * FROM saved_trip_activities WHERE trip_day_id = ?', [d.id]);
        return {
          day: d.day_number,
          activities: activities.map((a) => ({
            time: a.time_slot,
            title: a.activity_name,
            desc: a.description,
            cost: a.estimated_cost,
            transport: a.transport
          }))
        };
      })
    );

    res.status(200).json({
      success: true,
      data: {
        id: t.id,
        title: t.trip_name,
        destinationName: t.destination_name,
        days: t.duration,
        budget: t.budget,
        travelStyle: t.travel_style,
        interests: typeof t.interests === 'string' ? JSON.parse(t.interests) : t.interests,
        image: t.image_url,
        itineraryDays: structuredDays
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc Delete saved trip
// @route DELETE /api/trips/:id
exports.deleteTrip = async (req, res, next) => {
  try {
    const result = await query('DELETE FROM saved_trips WHERE id = ? AND user_id = ?', [req.params.id, req.user.id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Trip not found or unauthorized.' });
    }
    res.status(200).json({ success: true, message: 'Trip deleted successfully.' });
  } catch (error) {
    next(error);
  }
};
