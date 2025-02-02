const mongoose = require('mongoose');

const hackathonRegistrationSchema = new mongoose.Schema({
  teamName: { type: String, required: true },
  teamLeader: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true }
  },
  members: [{
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true }
  }],
  problemStatement: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('HackathonRegistration', hackathonRegistrationSchema); 