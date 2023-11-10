const mongoose = require('mongoose');
const rejectionReasonSchema = new mongoose.Schema({
  recruiterId: {
    type: String,
    
  },
  reason: {
    type: String,
    default: 'N/A', 
  },
});

const studentSchema = new mongoose.Schema({
  studentPic: {
    type: String,
  },
  name:{
    type: String,
    required: true,
    unique: true,
  },
  studnetID: {
    type: String,
    required: true,
    unique: true,
  },
  contactNo: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  courseStatus: {
    type: String,
    required: true,
  },
  courseName: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  cvAttachment: {
    type: mongoose.SchemaTypes.Mixed,
    required: true,
  },
  status: {
    type: String,
    enum: ['Placed', 'Jobseeker'],
    default: 'Jobseeker',
  },
  interviewStatus: {
    type: String,
  },
  numberOfInterviewsAttended: {
    type: Number,
    default: 0,
  },
  createdDate: {
    type: Date,
    default: Date.now, 
  },
  hiredStatus:{
    type: String,
    enum: ['Hired', 'Rejected', 'Relevant'],
    default: 'Relevant',
  },
  rejectionReasons: [rejectionReasonSchema], 
  

  
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
