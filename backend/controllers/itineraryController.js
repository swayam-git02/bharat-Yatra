const { query } = require('../config/database');
const { generateItineraryFromGemini } = require('../services/geminiService');

/**
 * @desc Generate AI Itinerary using Gemini API & MySQL destination context
 * @route POST /api/itinerary/generate
 * @access Protected (Auth Required)
 */
exports.generateItinerary = async (req, res, next) => {
  try {
    const {
      destination,
      destinationId,
      days = 3,
      budget = 10000,
      travelStyle = 'Friends',
      interests = [],
      travelers = 1,
      pace = 'Moderate',
      startDate,
      previousItinerary
    } = req.body;

    const targetDest = destination || destinationId;

    // 1. Validation
    if (!targetDest || typeof targetDest !== 'string' && typeof targetDest !== 'number') {
      return res.status(400).json({
        success: false,
        message: 'Destination name or destinationId is required.'
      });
    }

    const numDays = parseInt(days, 10);
    if (isNaN(numDays) || numDays < 1 || numDays > 30) {
      return res.status(400).json({
        success: false,
        message: 'Days must be an integer between 1 and 30.'
      });
    }

    const numBudget = parseFloat(budget);
    if (isNaN(numBudget) || numBudget <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Budget must be a positive number.'
      });
    }

    const validStyles = ['Solo', 'Couple', 'Family', 'Friends'];
    const normalizedStyle = validStyles.includes(travelStyle) ? travelStyle : 'Friends';

    const validPaces = ['Relaxed', 'Moderate', 'Packed', 'Balanced'];
    const normalizedPace = validPaces.includes(pace) ? (pace === 'Balanced' ? 'Moderate' : pace) : 'Moderate';

    // 2. Query MySQL for Destination Context
    let dbContext = null;
    try {
      let destRows = [];
      if (typeof targetDest === 'number' || !isNaN(parseInt(targetDest, 10))) {
        destRows = await query(
          `SELECT d.*, s.name AS state_name FROM destinations d JOIN states s ON d.state_id = s.id WHERE d.id = ?`,
          [targetDest]
        );
      }

      if (destRows.length === 0) {
        destRows = await query(
          `SELECT d.*, s.name AS state_name FROM destinations d JOIN states s ON d.state_id = s.id WHERE LOWER(d.name) = LOWER(?) OR LOWER(d.city) = LOWER(?) OR d.name LIKE ?`,
          [targetDest, targetDest, `%${targetDest}%`]
        );
      }

      if (destRows.length > 0) {
        const dest = destRows[0];
        const attractions = await query('SELECT * FROM attractions WHERE destination_id = ?', [dest.id]);
        const activities = await query('SELECT * FROM activities WHERE destination_id = ?', [dest.id]);
        const transport = await query('SELECT * FROM transport_options WHERE destination_id = ?', [dest.id]);
        const foods = await query('SELECT * FROM foods WHERE destination_id = ?', [dest.id]);
        const festivals = await query(
          `SELECT f.* FROM festivals f JOIN destination_festivals df ON f.id = df.festival_id WHERE df.destination_id = ?`,
          [dest.id]
        );

        dbContext = {
          destination: dest,
          attractions,
          activities,
          transport,
          foods,
          festivals
        };
      }
    } catch (dbError) {
      console.warn('⚠️ Warning: MySQL destination context lookup failed, proceeding with prompt context:', dbError.message);
    }

    // 3. Call Gemini Service
    const params = {
      destination: dbContext?.destination?.name || targetDest,
      destinationId: dbContext?.destination?.id || targetDest,
      days: numDays,
      budget: numBudget,
      travelStyle: normalizedStyle,
      interests: Array.isArray(interests) ? interests : [interests],
      travelers: Math.max(1, parseInt(travelers, 10) || 1),
      pace: normalizedPace,
      startDate: startDate || null,
      previousItinerary
    };

    let rawItinerary;
    try {
      rawItinerary = await generateItineraryFromGemini(params, dbContext);
    } catch (geminiErr) {
      console.error('Gemini Generation Error:', geminiErr.message);

      return res.status(503).json({
        success: false,
        message: geminiErr.message || 'Unable to generate itinerary at this moment. Please try again.'
      });
    }

    // 4. Validate & Normalize Generated Itinerary
    if (!rawItinerary || !rawItinerary.days || !Array.isArray(rawItinerary.days)) {
      return res.status(500).json({
        success: false,
        message: 'Generated itinerary structure was invalid. Please try again.'
      });
    }

    // Convert raw Gemini output into normalized React Timeline compatible days
    const normalizedItineraryDays = rawItinerary.days.map((d, index) => {
      const dayNum = d.day || index + 1;
      const activities = [];

      if (d.morning && (d.morning.activity || d.morning.description)) {
        activities.push({
          id: `act-${dayNum}-1`,
          time: 'Morning (08:30 AM)',
          title: d.morning.activity || 'Morning Sightseeing',
          desc: d.morning.description || '',
          cost: parseInt(d.morning.estimatedCost, 10) || 0,
          category: 'Attraction',
          transport: d.morning.transport || 'Local Cab / Walking',
          duration: d.morning.duration || '2 hours'
        });
      }

      if (d.afternoon && (d.afternoon.activity || d.afternoon.description)) {
        activities.push({
          id: `act-${dayNum}-2`,
          time: 'Afternoon (01:30 PM)',
          title: d.afternoon.activity || 'Afternoon Exploration',
          desc: d.afternoon.description || '',
          cost: parseInt(d.afternoon.estimatedCost, 10) || 0,
          category: 'Sightseeing',
          transport: d.afternoon.transport || 'Local Transport',
          duration: d.afternoon.duration || '3 hours'
        });
      }

      if (d.evening && (d.evening.activity || d.evening.description)) {
        activities.push({
          id: `act-${dayNum}-3`,
          time: 'Evening (06:00 PM)',
          title: d.evening.activity || 'Evening Experience',
          desc: d.evening.description || '',
          cost: parseInt(d.evening.estimatedCost, 10) || 0,
          category: 'Experience',
          transport: d.evening.transport || 'Local Transport',
          duration: d.evening.duration || '2 hours'
        });
      }

      if (d.foodSuggestion) {
        activities.push({
          id: `act-${dayNum}-4`,
          time: 'Food & Dining',
          title: `Culinary Pick: ${d.foodSuggestion}`,
          desc: `Sample recommended regional delicacies in ${params.destination}.`,
          cost: 0,
          category: 'Food',
          transport: 'Walking'
        });
      }

      return {
        day: dayNum,
        title: d.title || `Day ${dayNum} Exploration`,
        dayBudget: d.dayBudget || 0,
        tips: d.tips || [],
        activities
      };
    });

    const destinationName = dbContext?.destination?.name || params.destination;
    const heroImage = dbContext?.destination?.image_url || 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1200&auto=format&fit=crop';
    const destDbId = dbContext?.destination?.id || 1;

    const responsePayload = {
      success: true,
      data: {
        tripSummary: {
          title: rawItinerary.tripSummary?.title || `${params.days}-Day ${destinationName} Experience`,
          destination: destinationName,
          destinationId: destDbId,
          duration: params.days,
          travelStyle: params.travelStyle,
          travelers: params.travelers,
          budget: params.budget,
          estimatedTotal: rawItinerary.tripSummary?.estimatedTotal || rawItinerary.budgetBreakdown?.total || params.budget,
          image: heroImage
        },
        days: rawItinerary.days,
        itineraryDays: normalizedItineraryDays,
        budgetBreakdown: rawItinerary.budgetBreakdown || {
          accommodation: Math.round(params.budget * 0.4),
          transport: Math.round(params.budget * 0.2),
          activities: Math.round(params.budget * 0.2),
          food: Math.round(params.budget * 0.15),
          miscellaneous: Math.round(params.budget * 0.05),
          total: params.budget
        },
        travelTips: rawItinerary.travelTips || [
          'Keep cash handy for local street transport & entry tickets.',
          'Respect local customs and religious dress guidelines.'
        ],
        warnings: rawItinerary.warnings || [],
        sources: rawItinerary.sources || [],
        searchQueries: rawItinerary.searchQueries || []
      }
    };

    return res.status(200).json(responsePayload);

  } catch (error) {
    console.error('Unhandled Itinerary Controller Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Unable to generate itinerary. Please try again.'
    });
  }
};
