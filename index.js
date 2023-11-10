const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');
const userRoutes = require('./route/userRoute'); // Adjust the path based on your folder structure
const studentRoutes = require('./route/studentRoutes'); // Adjust the path based on your folder structure
const recruiterRoutes = require('./route/recruiterRoute');
const reasonofRejectionRoutes = require('./route/rejectionStudentRoute');
const cors = require('cors');
const path = require('path');

// Define the absolute path for serving static files
const absoluteUploadsPath = path.join(__dirname, 'my-project');
const port = process.env.PORT || 3000;

const app = express();

// Logging middleware to log requests
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Enable CORS
app.use(cors());

// Parse JSON requests
app.use(bodyParser.json());

// Serve static assets from the 'my-project' directory
app.use(express.static(absoluteUploadsPath));

// Define a catch-all route for the SPA (Angular app)
app.get('*', (req, res) => {
  res.sendFile(path.join(absoluteUploadsPath, 'index.html'));
});

// Connect to the database
db.connect()
  .then(() => {
    console.log('Database connected');
    // Include the user routes
    app.use('/apis/users', userRoutes);

    // Include the student routes
    app.use('/apis/students', studentRoutes);
    app.use('/apis/recruiters', recruiterRoutes);
    app.use('/apis/reasonofRejection', reasonofRejectionRoutes);

    // Serving static assets from the 'assets' directory
    app.use(express.static('assets'));

    // Test route
    app.get('*', (req, res) => {
      res.send('Server is running, database is connected');
    });

    // Start the server
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error(error.message);
    process.exit(1);
  });
