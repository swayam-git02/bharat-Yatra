const express = require('express');
const router = express.Router();
const {
  getDestinations,
  getDestinationById,
  getAttractions,
  getActivities,
  getTransport,
  getFood
} = require('../controllers/destinationController');

router.get('/', getDestinations);
router.get('/:id', getDestinationById);
router.get('/:id/attractions', getAttractions);
router.get('/:id/activities', getActivities);
router.get('/:id/transport', getTransport);
router.get('/:id/food', getFood);

module.exports = router;
