const Student = require('../model/studentModel');
const nodemailer = require('nodemailer');

async function registerStudent(studentData) {
  console.log('INside the service')
  try {
    const newStudent = await Student.create(studentData);
    return newStudent;
  } catch (error) {
    throw error;
  }
}

async function updateStudentStatus(studentId, status) {
  try {
    const updatedStudent = await Student.findByIdAndUpdate(
      studentId,
      { status },
      { new: true }
    );
    return updatedStudent;
  } catch (error) {
    throw error;
  }
}

async function updateHiredStatus(studentId, hiredStatus, status) {
  try {
    console.log('Updating student status:', studentId, hiredStatus, status);

    const updatedStudent = await Student.findByIdAndUpdate(
      studentId,
      { hiredStatus, status },
      { new: true }
    );

    console.log('Updated student:', updatedStudent);

    return updatedStudent;
  } catch (error) {
    throw error;
  }
}

async function updatechangereasonofRejection(studentId, rejectionReason, recruiterId) {
  try {
    console.log('Updating student status:', studentId, rejectionReason);

    const updatedStudent = await Student.findByIdAndUpdate(
      studentId,
      {
        $set: {
          'rejectionReason.recruiterId': recruiterId,
          'rejectionReason.reason': rejectionReason,
        },
      },
      { new: true }
    );

    console.log('Updated student:', updatedStudent);

    return updatedStudent;
  } catch (error) {
    throw error;
  }
}




async function updateStudentInterview(studentId, interviewStatus) {
  try {
    const updatedStudent = await Student.findByIdAndUpdate(
      studentId,
      { interviewStatus },
      { new: true }
    );
    return updatedStudent;
  } catch (error) {
    throw error;
  }
}

async function getAllStudents(recruiter_id) {
  console.log(recruiter_id, 'recruiter_id')
  try {
    const students = await Student.aggregate([
     
      {
        $lookup: {
          from: "rejectionrecords", // Name of the rejectionrecords collection
          localField: "_id",       // Field from the Student collection
          foreignField: "studentId", // Field from the rejectionrecords collection
          as: "rejectionRecords"    // Alias for the joined data
        }
      },
    
      {
        $project: {
          _id: 1,
          name: 1, 
          studnetID: 1, // Corrected field name
          contactNo: 1,
          email: 1,
          courseName: 1,
          location: 1,
          cvAttachment: 1,
          status: 1,
          numberOfInterviewsAttended: 1,
          hiredStatus: 1,
          createdDate: 1,
          rejectionReason: {
            $cond: {
              if: { $eq: ["$rejectionRecords.recruiterId", recruiter_id] },
              then: "$rejectionRecords.reason",
              else: null
            }
          }
        }
      }
    ]);

    return  students;
  } catch (error) {
    throw error;
  }
}


  

async function getJobSeekers() {
  try {
    const jobSeekers = await Student.find({ status: 'Jobseeker' });
    return jobSeekers;
  } catch (error) {
    throw error;
  }
}

async function getHired() {
  try {
    const Hired = await Student.find({ status: 'Placed' });
    return Hired;
  } catch (error) {
    throw error;
  }
}

async function getPlacedStudents() {
  try {
    const placedStudents = await Student.find({ status: 'Placed' });
    return placedStudents;
  } catch (error) {
    throw error;
  }
}

async function getStudentHistory(studentId) {
  try {
    const student = await Student.findById(studentId);
    return {
      interviewStatus: student.interviewStatus,
      numberOfInterviewsAttended: student.numberOfInterviewsAttended,
    };
  } catch (error) {
    throw error;
  }
}



const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'sharmanikita33373@gmail.com',
    pass: 'odyfznjkzsgyxfyx'
  },
});

async function sendInterviewSchedule(studentEmail, interviewDetails) {
  // Implement sending an email to the student with the interview schedule
  const mailOptions = {
    from: 'sharmanikita33373@gmail.com',
    to: studentEmail,
    subject: 'Interview Schedule',
    text: `You have been scheduled for an interview. Details: ${interviewDetails}`,
  };

  await transporter.sendMail(mailOptions);
}


async function getStudentById(studentId) {
  try {
    // Implement the logic to fetch a student by their ID from your data source
    const student = await Student.findById(studentId); // Replace "Student" with your actual model
    return student; // Return the student object if found, or null if not found
  } catch (error) {
    throw error;
  }
}

module.exports = {
  registerStudent,
  updateStudentStatus,
  updateStudentInterview,
  getJobSeekers,
  getHired,
  getPlacedStudents,
  getStudentHistory,
  getAllStudents,
  sendInterviewSchedule,
  getStudentById,
  updateHiredStatus,
  updatechangereasonofRejection
};
