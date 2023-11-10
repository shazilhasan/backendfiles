// rejectionRecordService.js
const RejectionRecord = require('../model/rejectionStudentModel'); // Import your RejectionRecord model here
const ReasonofRejectionService = require('../service/rejectionStudentService')
async function addRejectionRecord(req, res) {
    try {
      const { studentId, reason, recruiterId } = req.body;
  
      // Validation checks (ensure these values are present and valid)
  
      console.log('Adding rejection record:', studentId, reason, recruiterId);
  
      // Create a new rejection record
      const newRejectionRecord = new RejectionRecord({
        studentId,
        reason,
        recruiterId,
      });
  
      // Save the rejection record to the database
      const savedRecord = await newRejectionRecord.save();
  
      console.log('Added rejection record:', savedRecord);
  
      // Respond with the saved rejection record
      res.status(201).json({ message: 'Rejection record added successfully', data: savedRecord });
    } catch (error) {
      console.error('Error adding rejection record:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async function getAllRejection(req, res) {
    try {
      
      const rejection = await ReasonofRejectionService.ReasonofRejectionService(page, limit);
      return res.status(200).json(rejection);
    } catch (error) {
      console.error('Error fetching rejection:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
  

module.exports = {
  addRejectionRecord,
  getAllRejection
};
