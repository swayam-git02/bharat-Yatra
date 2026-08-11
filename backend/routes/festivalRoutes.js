const express = require('express');
const router = express.Router();
const { getFestivals, getFestivalById } = require('../controllers/festivalController');

router.get('/', getFestivals);
router.get('/:id', getFestivalById);

module.exports = router;
