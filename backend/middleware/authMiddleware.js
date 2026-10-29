const jwt = require('jsonwebtoken');

/**
 * Middleware to authenticate requests using custom JWT tokens.
 * Verifies Authorization header formatted as: 'Bearer <TOKEN>'
 */
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  
  if (!authHeader) {
    return res.status(401).json({
      success: false,
      message: 'Access denied. No authorization header provided.'
    });
  }

  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return res.status(401).json({
      success: false,
      message: 'Invalid authorization format. Format must be: Bearer <token>'
    });
  }

  const token = parts[1];
  const jwtSecret = process.env.JWT_SECRET;

  if (!jwtSecret) {
    console.error('FATAL: JWT_SECRET environment variable is not defined.');
    return res.status(500).json({
      success: false,
      message: 'Internal server configuration error.'
    });
  }

  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.user = decoded; // { id, email, role, name, iat, exp }
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Your session has expired. Please log in again.'
      });
    }

    return res.status(403).json({
      success: false,
      message: 'Invalid or forged token.'
    });
  }
}

module.exports = { authenticateToken };
