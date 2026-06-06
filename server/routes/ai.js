const express = require('express');
const router = express.Router();
const {
  analyzeStudent,
  getSkillProfile,
} = require('../controllers/aiController');
const authMiddleware = require('../middleware/auth');

router.post('/analyze', authMiddleware, analyzeStudent);
router.get('/skill-profile', authMiddleware, getSkillProfile);

module.exports = router;
