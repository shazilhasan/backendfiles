const express = require('express');

const bodyParser = require('body-parser');
const db = require('./db');
const userRoutes = require('./route/userRoute'); // Adjust the path based on your folder structure
const studentRoutes = require('./route/studentRoutes'); // Adjust the path based on your folder structure
const recruiterRoutes = require('./route/recruiterRoute')
const reasonofRejectionRoutes = require('./route/rejectionStudentRoute')
const cors = require('cors');
const app = express();
const path = require('path');
const absoluteUploadsPath = path.join(__dirname, 'my-project');
app.use( express.static(absoluteUploadsPath))
app.use('/*', fucntion(req, res) {
  res.sendFile(path.join(absoluteUploadsPath, 'index.html'));
});
const PORT = 3000;
console.log('.//////////////////////////////////////////////////////////////')
app.use(cors());

// Middleware
app.use(bodyParser.json());

// Connect to the database
db.connect()
  .then(() => {
    // Database connected successfully
    console.log('Database connected');
  })
  .catch((error) => {
    // Database connection failed
    console.error(error.message);
    process.exit(1);
  });

// Include the user routes
app.use('/apis/users', userRoutes);

// Include the student routes
app.use('/apis/students', studentRoutes);
app.use('/apis/recruiters', recruiterRoutes);
app.use('/apis/reasonofRejection', reasonofRejectionRoutes);
app.use(express.static('assets'));
// Test route
app.get('/', (req, res) => {
  res.send('Server is running, database is connected');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
