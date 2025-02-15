const HackathonUser = require('../models/HackathonUser');
const HackathonProblem = require('../models/HackathonProblem');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

// Hackathon User Registration
exports.register = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { teamName, members, password } = req.body;

    // Check if team name already exists
    const existingTeam = await HackathonUser.findOne({ teamName });
    if (existingTeam) {
      return res.status(400).json({ message: 'Team name already exists' });
    }

    // Create new hackathon user
    const hackathonUser = await HackathonUser.create({
      teamName,
      members,
      password
    });

    // Generate token
    const token = jwt.sign(
      { id: hackathonUser._id, teamName: hackathonUser.teamName },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(201).json({
      token,
      user: {
        id: hackathonUser._id,
        teamName: hackathonUser.teamName,
        members: hackathonUser.members
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Hackathon User Login
exports.login = async (req, res) => {
  try {
    const { teamName, password } = req.body;

    // Check if team exists
    const hackathonUser = await HackathonUser.findOne({ teamName });
    if (!hackathonUser) {
      return res.status(401).json({ message: 'Invalid team name or password' });
    }

    // Check password
    const isMatch = await hackathonUser.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid team name or password' });
    }

    // Generate token
    const token = jwt.sign(
      { id: hackathonUser._id, teamName: hackathonUser.teamName },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      token,
      user: {
        id: hackathonUser._id,
        teamName: hackathonUser.teamName,
        members: hackathonUser.members
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get all problems
exports.getProblems = async (req, res) => {
  try {
    const problems = await HackathonProblem.find()
      .select('-testCases.output') // Don't send hidden test case outputs
      .sort('difficulty');
    res.json(problems);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get single problem
exports.getProblem = async (req, res) => {
  try {
    const problem = await HackathonProblem.findById(req.params.id)
      .select('-testCases.output'); // Don't send hidden test case outputs
    if (!problem) {
      return res.status(404).json({ message: 'Problem not found' });
    }
    res.json(problem);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Submit solution
exports.submitSolution = async (req, res) => {
  try {
    const { problemId, submissionUrl } = req.body;
    const userId = req.user.id; // From auth middleware

    const hackathonUser = await HackathonUser.findById(userId);
    if (!hackathonUser) {
      return res.status(404).json({ message: 'Team not found' });
    }

    // Add submission
    hackathonUser.submissions.push({
      problem: problemId,
      submissionUrl,
      submittedAt: new Date()
    });

    // Add to registered problems if not already registered
    if (!hackathonUser.registeredProblems.includes(problemId)) {
      hackathonUser.registeredProblems.push(problemId);
    }

    await hackathonUser.save();

    res.json({
      message: 'Solution submitted successfully',
      submission: hackathonUser.submissions[hackathonUser.submissions.length - 1]
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get team submissions
exports.getTeamSubmissions = async (req, res) => {
  try {
    const userId = req.user.id; // From auth middleware

    const hackathonUser = await HackathonUser.findById(userId)
      .populate('submissions.problem', 'title difficulty points');

    if (!hackathonUser) {
      return res.status(404).json({ message: 'Team not found' });
    }

    res.json(hackathonUser.submissions);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get hackathon poster
exports.getPoster = async (req, res) => {
  try {
    const HackathonPoster = req.app.locals.models.HackathonPoster;
    const poster = await HackathonPoster.findOne();
    res.json(poster || { posterUrl: '', posterPublicId: '' });
  } catch (error) {
    console.error('Error getting poster:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update hackathon poster
exports.updatePoster = async (req, res) => {
  try {
    const HackathonPoster = req.app.locals.models.HackathonPoster;
    const { posterUrl, posterPublicId } = req.body;

    let poster = await HackathonPoster.findOne();
    if (poster) {
      poster.posterUrl = posterUrl;
      poster.posterPublicId = posterPublicId;
      await poster.save();
    } else {
      poster = await HackathonPoster.create({
        posterUrl,
        posterPublicId
      });
    }

    res.json(poster);
  } catch (error) {
    console.error('Error updating poster:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete hackathon poster
exports.deletePoster = async (req, res) => {
  try {
    const HackathonPoster = req.app.locals.models.HackathonPoster;
    await HackathonPoster.findOneAndDelete();
    res.json({ message: 'Poster deleted successfully' });
  } catch (error) {
    console.error('Error deleting poster:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};