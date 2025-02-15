const mongoose = require('mongoose');

const hackathonProblemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  difficulty: { 
    type: String, 
    enum: ['Easy', 'Medium', 'Hard'],
    required: true 
  },
  points: { type: Number, required: true },
  constraints: [String],
  sampleInput: String,
  sampleOutput: String,
  testCases: [{
    input: String,
    output: String,
    isHidden: { type: Boolean, default: false }
  }],
  timeLimit: { type: Number, default: 1000 }, // in milliseconds
  memoryLimit: { type: Number, default: 256 }, // in MB
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('HackathonProblem', hackathonProblemSchema);
