const express = require('express');
const multer = require('multer');
const {
  createCMS,
  getCMSList,
  getCMSById,
  updateCMS,
  deleteCMS
} = require('../controllers/cmsController');
const { requireAuth } = require('../middleware/authMiddleware');
const { requireAdmin } = require('../middleware/roleMiddleware');
const upload = multer({ dest: 'uploads/' });

const router = express.Router();

router.use(requireAuth);

router.get('/', getCMSList);
router.get('/:id', getCMSById);
router.post('/', upload.single('featuredImage'), requireAdmin, createCMS);
router.put('/:id', upload.single('featuredImage'), requireAdmin, updateCMS);
router.delete('/:id', requireAdmin, deleteCMS);

module.exports = router;
