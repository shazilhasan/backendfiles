const mongoose = require('mongoose');

const recruiterSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true,
  },
  name:{
    type: String,
    required: true,
    unique: true,
  },
  contactNumber: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  designation: {
    type: String,
    required: true,
  },
  jobDescription: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  anyBond: {
    type: String,
    enum: ['No', 'Yes'],
    default: 'No', // Set a default value as 'No'
  },
  salaryPackage: {
    type: String,
    required: true,
  },
  shared_student_ids: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
  }],
  createdDate: {
    type: Date,
    default: Date.now, 
  },
  jobTitle: {
    type: String, 
    required: true,
  },
  jobID: {
    type: String,
    required: true,
  }
});

recruiterSchema.pre('save', function(next) {
  if (!this.isModified('jobID')) {
    return next();
  }

  this.jobID = `TL${this.jobID}`;
  next();
});

const Recruiter = mongoose.model('Recruiter', recruiterSchema);

module.exports = Recruiter;
