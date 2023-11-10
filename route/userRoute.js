const express = require('express');
const userController = require('../controller/userController'); // Adjust the path based on your folder structure
const verifyAdmin = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.get('/user-data', verifyAdmin, userController.getUserData);


module.exports = router;