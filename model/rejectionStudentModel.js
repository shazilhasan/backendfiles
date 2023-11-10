const mongoose = require('mongoose');

const rejectionRecordSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student', // Reference to the Student model
    required: true,
  },
  recruiterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Recruiter', // Reference to the Recruiter model
    required: true,
  },
  reason: {
    type: String,
    required: true,
  },
});

const RejectionRecord = mongoose.model('RejectionRecord', rejectionRecordSchema);

module.exports = RejectionRecord;
