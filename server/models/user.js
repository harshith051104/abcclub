const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'editor', 'admin'], default: 'user' },
  createdAt: { type: Date, default: Date.now },
  resetToken: String,
  resetTokenExpiry: Date
});

module.exports = mongoose.model('User', userSchema);