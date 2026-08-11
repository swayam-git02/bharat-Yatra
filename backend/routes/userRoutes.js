const express = require('express');
const router = express.Router();
const { getUserProfile, updateUserProfile, updateUserPreferences } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect);

router.get('/profile', getUserProfile);
router.put('/profile', updateUserProfile);
router.put('/preferences', updateUserPreferences);

module.exports = router;
