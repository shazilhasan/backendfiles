
const studentService = require('../service/studentService');
const recruiterService = require('../service/recruiterService')
const fs = require('fs');
const nodemailer = require('nodemailer');



async function registerStudent(req, res) {
  const studentData = req.body;
  const cvAttachmentFile = req.file; // This will contain the uploaded file information
  // Check if cvAttachmentFile is available and add it to studentData
  if (cvAttachmentFile) {
    studentData.cvAttachment = {
      filename: cvAttachmentFile.filename,
      path: cvAttachmentFile.path,
      // Add other file details you might want to store, like mimetype and size
    };
  }

  try {
    const newStudent = await studentService.registerStudent(studentData);
    console.log(newStudent, 'newStudent');
    return res.status(201).json({ message: 'Student registered successfully', data: newStudent });
  } catch (error) {
    console.error('Error during student registration:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function changeStudentStatus(req, res) {
  const { studentId, status } = req.body;

  try {
    const updatedStudent = await studentService.updateStudentStatus(studentId, status);
    return res.status(200).json({ message: 'Student status updated successfully', data: updatedStudent });
  } catch (error) {
    console.error('Error during student status update:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function changeHiredStatus(req, res) {
  const { studentId, hiredStatus, status } = req.body;

  try {
    console.log('Received request to update student status:', studentId, hiredStatus, status);

    const updatedStudent = await studentService.updateHiredStatus(studentId, hiredStatus, status);
    console.log('Updated student:', updatedStudent);

    return res.status(200).json({ message: 'Status updated successfully', data: updatedStudent });
  } catch (error) {
    console.error('Error during student status update:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function changereasonofRejection(req, res) {
  try {
    const { studentId, rejectionReason, recruiterId } = req.body;

    // Validation checks
    if (!studentId || typeof studentId !== 'string') {
      return res.status(400).json({ error: 'Invalid studentId' });
    }

    if (!recruiterId || typeof recruiterId !== 'string') {
      return res.status(400).json({ error: 'Invalid recruiterId' });
    }

    if (!rejectionReason || typeof rejectionReason !== 'string') {
      return res.status(400).json({ error: 'Invalid rejectionReason' });
    }

    console.log('Received request to update student reasonofRejection:', studentId, rejectionReason);

    const updatedStudent = await studentService.updatechangereasonofRejection(studentId, rejectionReason, recruiterId);
    
    if (!updatedStudent) {
      return res.status(404).json({ error: 'Student not found' });
    }

    console.log('Updated student:', updatedStudent);

    return res.status(200).json({ message: 'ReasonofRejection updated successfully', data: updatedStudent });
  } catch (error) {
    console.error('Error during student ReasonofRejection update:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}









async function updateStudentInterview(req, res) {
  const { studentId, interviewStatus } = req.body;

  try {
    const updatedStudent = await studentService.updateStudentInterview(studentId, interviewStatus);
    return res.status(200).json({ message: 'Student interview status updated successfully', data: updatedStudent });
  } catch (error) {
    console.error('Error during student interview status update:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function getAllStudents(req, res) {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10; // Default limit to 10 students per page, adjust as needed
    const students = await studentService.getAllStudents(page, limit);
    return res.status(200).json(students);
  } catch (error) {
    console.error('Error fetching students:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

async function getJobSeekers(req, res) {
  try {
    const jobSeekers = await studentService.getJobSeekers();
    return res.status(200).json({ data: jobSeekers });
  } catch (error) {
    console.error('Error fetching job seekers:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function getHired(req, res) {
  try {
    const Hired = await studentService.getHired();
    return res.status(200).json({ data: Hired });
  } catch (error) {
    console.error('Error fetching job seekers:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function getPlacedStudents(req, res) {
  try {
    const placedStudents = await studentService.getPlacedStudents();
    return res.status(200).json({ data: placedStudents });
  } catch (error) {
    console.error('Error fetching placed students:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function getStudentHistory(req, res) {
  const { studentId } = req.params;

  try {
    const studentHistory = await studentService.getStudentHistory(studentId);
    return res.status(200).json({ data: studentHistory });
  } catch (error) {
    console.error('Error fetching student history:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}


module.exports = {
  registerStudent,
  changeStudentStatus,
  updateStudentInterview,
  getJobSeekers,
  getHired,
  getPlacedStudents,
  getStudentHistory,
  getAllStudents,
  changeHiredStatus,
  changereasonofRejection
};
