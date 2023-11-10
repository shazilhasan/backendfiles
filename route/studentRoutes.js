const express = require('express');
const multer = require('multer');
const upload = multer({ dest: 'uploads/'});

console.log(upload, '555')
const router = express.Router();
const verifyAdmin = require('../middleware/authMiddleware');
const studentController = require('../controller/studentController');

// Route for student registration
router.post('/register',verifyAdmin,upload.single('cvAttachment'), studentController.registerStudent);

// Route to change student status by Super admin
router.put('/change-status',verifyAdmin, studentController.changeStudentStatus);

router.put('/hired-status', studentController.changeHiredStatus);

router.put('/reasonof-rejection', studentController.changereasonofRejection);

// Route to update student interview status
router.put('/update-interview',verifyAdmin, studentController.updateStudentInterview);

// Route to get job seekers
router.get('/job-seekers',verifyAdmin, studentController.getJobSeekers);

// Route to get job seekers
router.get('/hired',verifyAdmin, studentController.getHired);

// Route to get placed students
router.get('/placed-students',verifyAdmin, studentController.getPlacedStudents);

// Route to get student history by studentId
router.get('/history/:studentId', verifyAdmin, studentController.getStudentHistory);

router.get('/all', studentController.getAllStudents);

module.exports = router;
