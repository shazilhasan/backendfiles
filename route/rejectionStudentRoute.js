const express = require('express');
const router = express.Router();
const rejectionRecordController = require('../controller/rejectionStudentController')



router.post('/reasonof-rejection', rejectionRecordController.addRejectionRecord);
router.get('/all-reasonof-rejection', rejectionRecordController.getAllRejection);


module.exports = router;
