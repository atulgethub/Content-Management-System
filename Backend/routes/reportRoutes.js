const express = require('express');
const { getDashboardStats } = require('../controllers/reportController');
const { requireAuth } = require('../middleware/authMiddleware');

const router = express.Router();
router.use(requireAuth);

router.get('/dashboard', getDashboardStats);

module.exports = router;
