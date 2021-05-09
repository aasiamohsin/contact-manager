const jwToken = require('jsonwebtoken');
const config = require('config');

const auth = (req, res, next) => {
  // Get the token from header
  const token = req.header('x-auth-token');

  // If token doesn't exist
  if (!token) {
    return res.status(401).json({ msg: 'Authorization denied' });
  }

  // Verify token
  try {
    const decoded = jwToken.verify(token, config.get('jwtSecret'));
    // Verified token assign to user
    req.user = decoded.user;
    // Executes next middleware in stack
    next();
  } catch (err) {
    console.error(err.message);
    res.status(401).json({ msg: 'Invalid token' });
  }
};

module.exports = auth;
