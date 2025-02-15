const express = require('express');
const { check } = require('express-validator');
const hackathonController = require('../controllers/hackathonController');
const auth = require('../middleware/auth');

const router = express.Router();

// Registration validation
const registerValidation = [
  check('teamName', 'Team name is required').not().isEmpty(),
  check('members', 'At least one team member is required').isArray({ min: 1 }),
  check('members.*.name', 'Member name is required').not().isEmpty(),
  check('members.*.email', 'Valid email is required').isEmail(),
  check('members.*.phone', 'Phone number is required').not().isEmpty(),
  check('members.*.role', 'Member role is required').not().isEmpty(),
  check('password', 'Password must be at least 6 characters').isLength({ min: 6 })
];

// Login validation
const loginValidation = [
  check('teamName', 'Team name is required').not().isEmpty(),
  check('password', 'Password is required').exists()
];

// Public routes
router.get('/problems', hackathonController.getProblems);
router.get('/problems/:id', hackathonController.getProblem);
router.get('/poster', hackathonController.getPoster);
router.post('/register', registerValidation, hackathonController.register);
router.post('/login', loginValidation, hackathonController.login);

// Protected routes (require authentication)
router.post('/problems/:id/submit', auth, hackathonController.submitSolution);
router.get('/submissions', auth, hackathonController.getTeamSubmissions);

// Poster management routes (protected)
router.post('/poster', auth, hackathonController.updatePoster);
router.delete('/poster', auth, hackathonController.deletePoster);

module.exports = router;
