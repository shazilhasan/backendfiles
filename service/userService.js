const User = require('../model/userModel');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const blacklistedTokens = new Set();
async function authenticateUser(email, password) {
    try {
      const user = await User.findOne({ email });
  
      if (!user || !user.comparePassword(password)) {
        return null; 
      }
  
      return user; 
    } catch (error) {
      throw error;
    }
  }

  async function findUserByEmail(email) {
    try {
      const user = await User.findOne({ email });
      return user;
    } catch (error) {
      throw error;
    }
  }

  function isTokenBlacklisted(token) {
    return blacklistedTokens.has(token);
  }

  function blacklistToken(token) {
    blacklistedTokens.add(token);
  }

  async function logoutUser(userId, token) {
    try {
      blacklistToken(token);
  
      return true; 
    } catch (error) {
      throw error;
    }
  }

  async function findUserById(userId) {
    try {
      const user = await User.findById(userId);
      return user;
    } catch (error) {
      throw error;
    }
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'sharmanikita33373@gmail.com',
      pass: 'odyfznjkzsgyxfyx',
    },
  });

  async function sendPasswordResetEmail(user) {
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpiry = Date.now() + 3600000; // 1 hour
  
    // Update user's reset token and expiry in the database
    await User.updateUserResetToken(user._id, resetToken, resetTokenExpiry);
  
    // Prepare the email content
    const mailOptions = {
      from: 'sharmanikita33373@gmail.com',
      to: user.email,
      subject: 'Password Reset Request',
      text: `You have requested a password reset. Please use the following link to reset your password: ${resetToken}`,
    };
  
    // Send the password reset email
    try {
      await transporter.sendMail(mailOptions);
      return resetToken; // Return the generated reset token for further processing if needed
    } catch (error) {
      console.error('Error sending email:', error);
      throw error;
    }
  }
  
  module.exports = { authenticateUser, findUserByEmail, logoutUser, isTokenBlacklisted, findUserById, sendPasswordResetEmail };
  