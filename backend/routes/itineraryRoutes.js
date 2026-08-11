const express = require('express');
const { body } = require('express-validator');
const router = express.Router();

const { generateItinerary } = require('../controllers/itineraryController');
const { protect } = require('../middleware/authMiddleware');
const { validate } = require('../middleware/validationMiddleware');
const { itineraryRateLimiter } = require('../middleware/rateLimitMiddleware');

// Validation rules for itinerary generation
const itineraryValidations = [
  body('destination')
    .notEmpty()
    .withMessage('Destination is required.'),
  body('days')
    .isInt({ min: 1, max: 30 })
    .withMessage('Days must be an integer between 1 and 30.'),
  body('budget')
    .isNumeric()
    .custom((val) => val > 0)
    .withMessage('Budget must be a positive number.'),
  body('travelStyle')
    .optional()
    .isIn(['Solo', 'Couple', 'Family', 'Friends'])
    .withMessage('Travel style must be Solo, Couple, Family, or Friends.'),
  body('pace')
    .optional()
    .isIn(['Relaxed', 'Moderate', 'Packed', 'Balanced'])
    .withMessage('Pace must be Relaxed, Moderate, Packed, or Balanced.'),
  body('interests')
    .optional()
    .isArray()
    .withMessage('Interests must be an array of strings.'),
  body('travelers')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Travelers must be an integer >= 1.')
];

// @route   POST /api/itinerary/generate
// @desc    Generate structured AI itinerary
// @access  Protected
router.post(
  '/generate',
  protect,
  itineraryRateLimiter({ windowMs: 15 * 60 * 1000, max: 10 }),
  itineraryValidations,
  validate,
  generateItinerary
);

module.exports = router;
