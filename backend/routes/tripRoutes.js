const express = require('express');
const router = express.Router();
const { createTrip, getUserTrips, getTripById, getPublicTrip, deleteTrip } = require('../controllers/tripController');
const { protect } = require('../middleware/authMiddleware');

// Public route for shared trips
router.get('/public/:id', getPublicTrip);

// Protected routes
router.use(protect);
router.post('/', createTrip);
router.get('/', getUserTrips);
router.get('/:id', getTripById);
router.delete('/:id', deleteTrip);

module.exports = router;
