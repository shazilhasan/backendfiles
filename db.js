// db.js

const mongoose = require('mongoose');
const User = require('./model/userModel');
const bcrypt = require('bcrypt');
const DB_URL = 'mongodb+srv://shazilhasan:hassan123@cluster0.jqaucb4.mongodb.net/?retryWrites=true&w=majority';
// Replace <username>, <password>, <cluster-url>, and <database-name> with your actual MongoDB credentials and database name

const connectDB = async () => {
    try {
      await mongoose.connect(DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
  
      console.log('Connected to the database');
  
      // Create the super admin if it doesn't already exist
      const checkUserExist = await User.findOne({ email: 'admin@jobportal.com' });
      if (!checkUserExist) {
        const saltRounds = 10;
        const plainPassword = 'admin@111';
  
        bcrypt.hash(plainPassword, saltRounds, async (err, hashedPassword) => {
          if (err) {
            console.error('Error hashing password:', err.message);
            process.exit(1);
          }
  
          const newSuperAdmin = new User({
            firstName: 'Super Admin',
            lastName: 'admin',
            email: 'admin@jobportal.com',
            countryCode: '+91',
            contactNumber: '9664531509',
            countryIso2: 'IN',
            password: hashedPassword,
            role: 'admin',
          });
  
          await newSuperAdmin.save();
          console.log('Super admin created:', newSuperAdmin);
        });
      }
    } catch (error) {
      console.error('Database connection failed:', error.message);
      process.exit(1);
    }
  };
  
  module.exports = {
    connect: connectDB,
  };
  
  
  
  
