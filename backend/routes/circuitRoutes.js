const express = require('express');
const router = express.Router();
const { getCircuits, getCircuitById } = require('../controllers/circuitController');

router.get('/', getCircuits);
router.get('/:id', getCircuitById);

module.exports = router;
