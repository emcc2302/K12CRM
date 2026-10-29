const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

/**
 * Handle Admin Login
 * POST /api/auth/login
 */
async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Both email and password are required.'
      });
    }

    const trimmedEmail = email.trim().toLowerCase();
    let admin = null;

    // 1. Query PostgreSQL if connected
    if (db.getIsConnected() && db.pool) {
      const result = await db.pool.query(
        'SELECT id, email, password_hash, name, role FROM admins WHERE LOWER(email) = $1',
        [trimmedEmail]
      );
      if (result.rows.length > 0) {
        admin = result.rows[0];
      }
    } else {
      // Fallback store lookup
      admin = db.fallbackStore.admins.find(
        (a) => a.email.toLowerCase() === trimmedEmail
      );
    }

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.'
      });
    }

    // 2. Verify password with bcrypt
    const isPasswordValid = await bcrypt.compare(password, admin.password_hash);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.'
      });
    }

    // 3. Generate custom JWT
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      return res.status(500).json({
        success: false,
        message: 'Server configuration error: JWT_SECRET missing.'
      });
    }

    const tokenPayload = {
      id: admin.id,
      email: admin.email,
      name: admin.name || 'Admin User',
      role: admin.role || 'admin'
    };

    const token = jwt.sign(tokenPayload, jwtSecret, { expiresIn: '24h' });

    return res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      admin: tokenPayload
    });
  } catch (error) {
    console.error('Error during admin login:', error);
    return res.status(500).json({
      success: false,
      message: 'An internal error occurred during authentication.'
    });
  }
}

/**
 * Get current authenticated admin
 * GET /api/auth/me
 */
async function getMe(req, res) {
  try {
    return res.status(200).json({
      success: true,
      admin: req.user
    });
  } catch (error) {
    console.error('Error in getMe:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve profile.'
    });
  }
}

module.exports = {
  login,
  getMe
};
