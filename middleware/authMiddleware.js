const jwt = require('jsonwebtoken');

function verifyAdmin(req, res, next) {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ error: 'Access denied. Token not provided.' });
  }

  try {
    const decodedToken = jwt.verify(token, 'your_secret_key'); // Replace 'your_secret_key' with your secret key used for signing the JWT

    if (decodedToken.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied. You are not authorized to perform this action.' });
    }

    req.user = decodedToken;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token.' });
  }
}

module.exports = verifyAdmin;
