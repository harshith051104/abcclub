const express = require('express');
const router = express.Router();
const galleryController = require('../controllers/galleryController');
const auth = require('../middleware/auth');

// Public routes
router.get('/', galleryController.getAllAlbums);

// Protected routes (require authentication)
router.post('/', auth, galleryController.addAlbum);
router.put('/:id', auth, galleryController.updateAlbum);
router.delete('/:id', auth, galleryController.deleteAlbum);
router.put('/', auth, galleryController.bulkUpdateAlbums);

module.exports = router;
