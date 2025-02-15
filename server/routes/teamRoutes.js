const express = require('express');
const router = express.Router();
const teamController = require('../controllers/teamController');
const auth = require('../middleware/auth');

// Public routes
router.get('/', teamController.getAllMembers);

// Protected routes (require authentication)
router.post('/', auth, teamController.addMember);
router.put('/:id', auth, teamController.updateMember);
router.delete('/:id', auth, teamController.deleteMember);
router.put('/reorder', auth, teamController.reorderMembers);

module.exports = router;
