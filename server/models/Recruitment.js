const mongoose = require('mongoose');

const recruitmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  enrollmentNumber: { type: String, required: true },
  ifheMail: { type: String, required: true },
  contactNumber: { type: String, required: true },
  academicYear: { type: String, required: true },
  branch: { type: String, required: true },
  experience: { type: String },
  preferredDomain: { type: String, required: true },
  status: { 
    type: String, 
    enum: ['pending', 'accepted', 'rejected'], 
    default: 'pending' 
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Recruitment', recruitmentSchema); 