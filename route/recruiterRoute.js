const express = require('express');
const router = express.Router();
const recruiterController = require('../controller/recruiterController');
const verifyAdmin = require('../middleware/authMiddleware');

router.post('/register', recruiterController.createRecruiter);
router.put('/update-status', recruiterController.updateRecruiterStatus);
router.post('/login', recruiterController.login);
router.get('/all-recruiter', recruiterController.getAllRecruiters);
router.post('/send-profile/:recruiterId',verifyAdmin, recruiterController.sendProfile);


module.exports = router;
