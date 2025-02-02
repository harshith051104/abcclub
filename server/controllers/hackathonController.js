const HackathonRegistration = require('../models/HackathonRegistration');

exports.register = async (req, res) => {
  try {
    const registration = await HackathonRegistration.create(req.body);
    res.status(201).json(registration);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getAllRegistrations = async (req, res) => {
  try {
    const registrations = await HackathonRegistration.find().sort('-createdAt');
    res.json(registrations);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
}; 