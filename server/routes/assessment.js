const express = require('express');
const router = express.Router();
const {
  submitAssessment,
  getAssessment,
} = require('../controllers/assessmentController');
const authMiddleware = require('../middleware/auth');

router.post('/submit', authMiddleware, submitAssessment);
router.get('/get', authMiddleware, getAssessment);

module.exports = router;
