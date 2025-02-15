const express = require('express');
const router = express.Router();
const uploadController = require('../controllers/uploadController');
const auth = require('../middleware/auth');

// Protected routes - require authentication
router.post('/', auth, uploadController.uploadImage);
router.delete('/:public_id', auth, uploadController.deleteImage);

module.exports = router;
