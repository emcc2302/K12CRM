const db = require('../config/db');

const VALID_USER_TYPES = ['Parent', 'Student', 'School'];
const VALID_CATEGORIES = ['Scholarship', 'Concert', 'Admission', 'General Query'];
const VALID_STATUSES = ['New', 'In Progress', 'Resolved'];

/**
 * Public Endpoint: Submit an Inquiry
 * POST /api/inquiries
 */
async function createInquiry(req, res) {
  try {
    const { name, email, phone, user_type, category, message } = req.body;

    // Field presence validation
    if (!name || !email || !phone || !user_type || !category || !message) {
      return res.status(400).json({
        success: false,
        message: 'All fields (Name, Email, Phone, User Type, Category, Message) are required.'
      });
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address.'
      });
    }

    // User Type validation
    if (!VALID_USER_TYPES.includes(user_type)) {
      return res.status(400).json({
        success: false,
        message: `User type must be one of: ${VALID_USER_TYPES.join(', ')}`
      });
    }

    // Category validation
    if (!VALID_CATEGORIES.includes(category)) {
      return res.status(400).json({
        success: false,
        message: `Category must be one of: ${VALID_CATEGORIES.join(', ')}`
      });
    }

    const trimmedName = name.trim();
    const trimmedEmail = email.trim().toLowerCase();
    const trimmedPhone = phone.trim();
    const trimmedMessage = message.trim();

    let savedInquiry = null;

    if (db.getIsConnected() && db.pool) {
      const result = await db.pool.query(
        `INSERT INTO inquiries (name, email, phone, user_type, category, message, status)
         VALUES ($1, $2, $3, $4, $5, $6, 'New')
         RETURNING id, name, email, phone, user_type, category, message, status, created_at`,
        [trimmedName, trimmedEmail, trimmedPhone, user_type, category, trimmedMessage]
      );
      savedInquiry = result.rows[0];
    } else {
      // In-memory fallback
      const newId = db.fallbackStore.inquiries.length > 0 
        ? Math.max(...db.fallbackStore.inquiries.map((i) => i.id)) + 1 
        : 1;

      savedInquiry = {
        id: newId,
        name: trimmedName,
        email: trimmedEmail,
        phone: trimmedPhone,
        user_type,
        category,
        message: trimmedMessage,
        status: 'New',
        created_at: new Date().toISOString()
      };
      db.fallbackStore.inquiries.unshift(savedInquiry);
    }

    return res.status(201).json({
      success: true,
      message: 'Inquiry submitted successfully! Our team will contact you shortly.',
      inquiry: savedInquiry
    });
  } catch (error) {
    console.error('Error submitting inquiry:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to submit inquiry. Please try again later.'
    });
  }
}

/**
 * Protected Endpoint: Get all inquiries with filtering and search
 * GET /api/inquiries
 */
async function getInquiries(req, res) {
  try {
    const { category, user_type, status, search, page = 1, limit = 50 } = req.query;

    if (db.getIsConnected() && db.pool) {
      let queryText = 'SELECT * FROM inquiries WHERE 1=1';
      const params = [];
      let paramIndex = 1;

      if (category && category !== 'All' && category !== 'All Categories') {
        queryText += ` AND category = $${paramIndex++}`;
        params.push(category);
      }

      if (user_type && user_type !== 'All' && user_type !== 'All User Types') {
        queryText += ` AND user_type = $${paramIndex++}`;
        params.push(user_type);
      }

      if (status && status !== 'All' && status !== 'All Statuses') {
        queryText += ` AND status = $${paramIndex++}`;
        params.push(status);
      }

      if (search && search.trim() !== '') {
        const searchPattern = `%${search.trim()}%`;
        queryText += ` AND (name ILIKE $${paramIndex} OR phone ILIKE $${paramIndex} OR email ILIKE $${paramIndex})`;
        params.push(searchPattern);
        paramIndex++;
      }

      queryText += ' ORDER BY created_at DESC';

      const result = await db.pool.query(queryText, params);
      const inquiries = result.rows;

      // Calculate stats
      const statsResult = await db.pool.query(`
        SELECT 
          COUNT(*)::int as total,
          COUNT(CASE WHEN status = 'New' THEN 1 END)::int as new,
          COUNT(CASE WHEN status = 'In Progress' THEN 1 END)::int as in_progress,
          COUNT(CASE WHEN status = 'Resolved' THEN 1 END)::int as resolved
        FROM inquiries
      `);
      const stats = statsResult.rows[0] || { total: 0, new: 0, in_progress: 0, resolved: 0 };

      return res.status(200).json({
        success: true,
        count: inquiries.length,
        inquiries,
        stats: {
          total: stats.total,
          new: stats.new,
          inProgress: stats.in_progress,
          resolved: stats.resolved
        }
      });
    } else {
      // In-memory fallback
      let inquiries = [...db.fallbackStore.inquiries];

      if (category && category !== 'All' && category !== 'All Categories') {
        inquiries = inquiries.filter((i) => i.category.toLowerCase() === category.toLowerCase());
      }

      if (user_type && user_type !== 'All' && user_type !== 'All User Types') {
        inquiries = inquiries.filter((i) => i.user_type.toLowerCase() === user_type.toLowerCase());
      }

      if (status && status !== 'All' && status !== 'All Statuses') {
        inquiries = inquiries.filter((i) => i.status.toLowerCase() === status.toLowerCase());
      }

      if (search && search.trim() !== '') {
        const q = search.trim().toLowerCase();
        inquiries = inquiries.filter(
          (i) =>
            i.name.toLowerCase().includes(q) ||
            i.phone.toLowerCase().includes(q) ||
            i.email.toLowerCase().includes(q)
        );
      }

      // Sort newest first
      inquiries.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

      // Calculate overall stats from whole collection
      const all = db.fallbackStore.inquiries;
      const stats = {
        total: all.length,
        new: all.filter((i) => i.status === 'New').length,
        inProgress: all.filter((i) => i.status === 'In Progress').length,
        resolved: all.filter((i) => i.status === 'Resolved').length
      };

      return res.status(200).json({
        success: true,
        count: inquiries.length,
        inquiries,
        stats
      });
    }
  } catch (error) {
    console.error('Error fetching inquiries:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch inquiries.'
    });
  }
}

/**
 * Protected Endpoint: Update inquiry status
 * PATCH /api/inquiries/:id/status
 */
async function updateInquiryStatus(req, res) {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status || !VALID_STATUSES.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Status must be one of: ${VALID_STATUSES.join(', ')}`
      });
    }

    if (db.getIsConnected() && db.pool) {
      const result = await db.pool.query(
        'UPDATE inquiries SET status = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *',
        [status, id]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'Inquiry not found.'
        });
      }

      return res.status(200).json({
        success: true,
        message: `Status updated to ${status}`,
        inquiry: result.rows[0]
      });
    } else {
      const item = db.fallbackStore.inquiries.find((i) => i.id == id);
      if (!item) {
        return res.status(404).json({
          success: false,
          message: 'Inquiry not found.'
        });
      }
      item.status = status;
      item.updated_at = new Date().toISOString();

      return res.status(200).json({
        success: true,
        message: `Status updated to ${status}`,
        inquiry: item
      });
    }
  } catch (error) {
    console.error('Error updating inquiry status:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to update inquiry status.'
    });
  }
}

/**
 * Protected Endpoint: Delete an inquiry
 * DELETE /api/inquiries/:id
 */
async function deleteInquiry(req, res) {
  try {
    const { id } = req.params;

    if (db.getIsConnected() && db.pool) {
      const result = await db.pool.query(
        'DELETE FROM inquiries WHERE id = $1 RETURNING id',
        [id]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'Inquiry not found.'
        });
      }

      return res.status(200).json({
        success: true,
        message: 'Inquiry deleted successfully.',
        id: result.rows[0].id
      });
    } else {
      const index = db.fallbackStore.inquiries.findIndex((i) => i.id == id);
      if (index === -1) {
        return res.status(404).json({
          success: false,
          message: 'Inquiry not found.'
        });
      }
      db.fallbackStore.inquiries.splice(index, 1);

      return res.status(200).json({
        success: true,
        message: 'Inquiry deleted successfully.',
        id: Number(id)
      });
    }
  } catch (error) {
    console.error('Error deleting inquiry:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to delete inquiry.'
    });
  }
}

/**
 * Protected Endpoint: Get overall statistics
 * GET /api/inquiries/stats
 */
async function getStats(req, res) {
  try {
    if (db.getIsConnected() && db.pool) {
      const result = await db.pool.query(`
        SELECT 
          COUNT(*)::int as total,
          COUNT(CASE WHEN status = 'New' THEN 1 END)::int as new,
          COUNT(CASE WHEN status = 'In Progress' THEN 1 END)::int as in_progress,
          COUNT(CASE WHEN status = 'Resolved' THEN 1 END)::int as resolved
        FROM inquiries
      `);

      const categoriesResult = await db.pool.query(`
        SELECT category, COUNT(*)::int as count 
        FROM inquiries 
        GROUP BY category
      `);

      const userTypesResult = await db.pool.query(`
        SELECT user_type, COUNT(*)::int as count 
        FROM inquiries 
        GROUP BY user_type
      `);

      return res.status(200).json({
        success: true,
        stats: {
          total: result.rows[0].total,
          new: result.rows[0].new,
          inProgress: result.rows[0].in_progress,
          resolved: result.rows[0].resolved,
          byCategory: categoriesResult.rows,
          byUserType: userTypesResult.rows
        }
      });
    } else {
      const all = db.fallbackStore.inquiries;
      const stats = {
        total: all.length,
        new: all.filter((i) => i.status === 'New').length,
        inProgress: all.filter((i) => i.status === 'In Progress').length,
        resolved: all.filter((i) => i.status === 'Resolved').length,
        byCategory: VALID_CATEGORIES.map((c) => ({
          category: c,
          count: all.filter((i) => i.category === c).length
        })),
        byUserType: VALID_USER_TYPES.map((u) => ({
          user_type: u,
          count: all.filter((i) => i.user_type === u).length
        }))
      };

      return res.status(200).json({
        success: true,
        stats
      });
    }
  } catch (error) {
    console.error('Error fetching stats:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve statistics.'
    });
  }
}

module.exports = {
  createInquiry,
  getInquiries,
  updateInquiryStatus,
  deleteInquiry,
  getStats
};
