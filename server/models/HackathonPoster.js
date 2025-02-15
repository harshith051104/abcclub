const mongoose = require('mongoose');

const hackathonPosterSchema = new mongoose.Schema({
  posterUrl: {
    type: String,
    required: true
  },
  posterPublicId: {
    type: String,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('HackathonPoster', hackathonPosterSchema);
