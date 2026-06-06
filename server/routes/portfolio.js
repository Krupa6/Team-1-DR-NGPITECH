const express = require('express');
const router = express.Router();
const {
  uploadPortfolio,
  getPortfolio,
} = require('../controllers/portfolioController');
const authMiddleware = require('../middleware/auth');

router.post('/upload', authMiddleware, uploadPortfolio);
router.get('/get', authMiddleware, getPortfolio);

module.exports = router;
