const Recruiter = require('../model/recruiterModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
// Create a new recruiter
async function createRecruiter(recruiterData) {
  try {
    const newRecruiter = await Recruiter.create(recruiterData);
    return newRecruiter;
  } catch (error) {
    throw error;
  }
}

async function getAllRecruiters() {
  try {
    const recruiters = await Recruiter.find();
    return recruiters;
  } catch (error) {
    throw error;
  }
}



// Update recruiter status and feedback in student history
async function updateRecruiterStatus(studentId, recruiterStatus, feedbackStatus) {
  try {
    const student = await Student.findById(studentId);
    if (!student) {
      return null;
    }
    // Update recruiter status and feedback in student history
    student.recruiterStatus = recruiterStatus;
    student.feedbackStatus = feedbackStatus;
    await student.save();
    return student;
  } catch (error) {
    throw error;
  }
}


async function login(email, password) {
    try {
      const recruiter = await Recruiter.findOne({ email });
  
      if (!recruiter || !bcrypt.compareSync(password, recruiter.password)) {
        return null;
      }
  
      // Generate a JWT token for the recruiter
      const token = jwt.sign({ userId: recruiter._id, role: 'recruiter' }, 'your_secret_key')
  
      return token;
    } catch (error) {
      throw error;
    }
  }
  
  // Recruiter forgot password
  async function forgotPassword(email) {
    try {
      const recruiter = await Recruiter.findOne({ email });
  
      if (!recruiter) {
        return null;
      }
  
      // Generate a reset token and send it to the recruiter's email
      const resetToken = jwt.sign({ userId: recruiter._id }, 'your_reset_secret_key', {
        expiresIn: '1h', // Set the reset token expiration time
      });
  
      // Here, you can send the reset token to the recruiter's email using a mailing service (e.g., Nodemailer).
  
      return resetToken;
    } catch (error) {
      throw error;
    }
  }

  async function findById(recruiterId) {
    try {
      const recruiter = await Recruiter.findById(recruiterId);
      return recruiter;
    } catch (error) {
      throw error;
    }
  }

  async function sendProfile(recruiterId, sharedStudentIds) {
    try {
      const recruiter = await Recruiter.findByIdAndUpdate(
        recruiterId,
        { $push: { shared_student_ids: { $each: sharedStudentIds } } },
        { new: true }
      );
  
      if (!recruiter) {
        return null;
      }
  
      return recruiter;
    } catch (error) {
      throw error;
    }
  }

module.exports = {
  createRecruiter,
  updateRecruiterStatus,
  login,
  forgotPassword,
  getAllRecruiters,
  findById,
  sendProfile
};
