const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const auth = require('../middleware/auth');

// Public routes
router.get('/', eventController.getAllEvents);

// Protected routes (require authentication)
router.post('/', auth, eventController.addEvent);
router.put('/:id', auth, eventController.updateEvent);
router.delete('/:id', auth, eventController.deleteEvent);
router.post('/bulk', auth, eventController.bulkUpdateEvents);

module.exports = router;
