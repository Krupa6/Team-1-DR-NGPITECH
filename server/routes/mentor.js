const express = require('express');
const router = express.Router();
const {
  getMentorsByCareerGoal,
  assignMentor,
  getMentorDashboard,
} = require('../controllers/mentorController');
const authMiddleware = require('../middleware/auth');

router.get('/:careerGoal', getMentorsByCareerGoal);
router.post('/assign', authMiddleware, assignMentor);
router.get('/dashboard/:mentorId', getMentorDashboard);

module.exports = router;
