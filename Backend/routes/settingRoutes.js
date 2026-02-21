const express = require('express');
const {
  getSettings,
  updateSetting
} = require('../controllers/settingController');
const { requireAuth } = require('../middleware/authMiddleware');
const { requireAdmin } = require('../middleware/roleMiddleware');

const router = express.Router();
router.use(requireAuth);

router.get('/', getSettings);
router.post('/', requireAdmin, updateSetting);

module.exports = router;
