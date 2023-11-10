// rejectionRecordService.js
const RejectionRecord = require('../model/rejectionStudentModel'); // Import your RejectionRecord model here

async function addRejectionRecord(studentId, reason, recruiterId) {
  try {
    console.log('Adding rejection record:', studentId, reason, recruiterId);

    const newRejectionRecord = new RejectionRecord({
      studentId,
      reason,
      recruiterId,
    });

    const savedRecord = await newRejectionRecord.save();

    console.log('Added rejection record:', savedRecord);

    return savedRecord;
  } catch (error) {
    throw error;
  }
}


async function getAllRejection(page, limit) {
    try {
      const skip = (page - 1) * limit;
      const rejection = await RejectionRecord.find().skip(skip).limit(limit);
      return rejection;
    } catch (error) {
      throw error;
    }
  }

module.exports = {
  addRejectionRecord,
  getAllRejection
};
