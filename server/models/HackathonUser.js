const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const hackathonUserSchema = new mongoose.Schema({
  teamName: { type: String, required: true, unique: true },
  members: [{
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    role: { type: String, required: true } // e.g., 'Team Leader', 'Member'
  }],
  password: { type: String, required: true },
  registeredProblems: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'HackathonProblem'
  }],
  submissions: [{
    problem: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'HackathonProblem'
    },
    submissionUrl: String,
    submittedAt: { type: Date, default: Date.now }
  }],
  createdAt: { type: Date, default: Date.now }
});

// Hash password before saving
hackathonUserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Compare password method
hackathonUserSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('HackathonUser', hackathonUserSchema);
