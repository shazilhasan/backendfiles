
// controllers/userController.js
const userService = require('../service/userService'); // Adjust the path based on your folder structure
const jwt = require('jsonwebtoken');

async function login(req, res) {
  const { email, password } = req.body;

  try {
    const user = await userService.authenticateUser(email, password);

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    // Generate a JWT token and send it in the response`
    const token = jwt.sign({ userId: user._id, role: user.role , recruiter_id:user.recruiter_id}, 'your_secret_key'); // Replace 'your_secret_key' with your secret key

    // Return a success message along with the token
    return res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}


  async function logout(req, res) {
    const token = req.headers.authorization;
  
    try {
      // Check if the token is present in the request
      if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
      }
  
      // Verify the token's authenticity (optional step)
      jwt.verify(token, 'your_secret_key', async (err, decoded) => {
        if (err) {
          return res.status(401).json({ error: 'Invalid token' });
        }
  
        // Check if the token is blacklisted (already logged out)
        if (userService.isTokenBlacklisted(token)) {
          return res.status(401).json({ error: 'Token is already blacklisted' });
        }
  
        // Call the userService to handle the logout operation
        const logoutSuccess = await userService.logoutUser(decoded.userId, token);
        // Remove the token from the client-side if the logout operation succeeded
        if (logoutSuccess) {
          // Return a success message to the client
          return res.status(200).json({ message: 'Logout successful' });
        } else {
          // Return an error message to the client if the logout operation failed
          return res.status(500).json({ error: 'Logout failed' });
        }
      });
    } catch (error) {
      console.error('Error during logout:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
  
  async function getUserData(req, res) {
    const token = req.headers.authorization;
  
    try {
      // Check if the token is present in the request
      if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
      }
  
      // Verify the token's authenticity
      jwt.verify(token, 'your_secret_key', async (err, decoded) => {
        if (err) {
          return res.status(401).json({ error: 'Invalid token' });
        }
  
        // Here, you can use the decoded user ID to fetch user data from the database
        const user = await userService.findUserById(decoded.userId);
  
        if (!user) {
          return res.status(404).json({ error: 'User not found' });
        }
  
        // Return the user data to the client
        return res.status(200).json(user);
      });
    } catch (error) {
      console.error('Error during getUserData:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

module.exports = { login, logout, getUserData };
