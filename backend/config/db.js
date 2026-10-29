const { Pool } = require('pg');
const path = require('path');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');

dotenv.config({ path: path.join(__dirname, '..', '.env') });
dotenv.config();

const connectionString = process.env.DATABASE_URL;

let pool = null;
let isPostgresConnected = false;

// In-memory mock store used ONLY as an instant zero-config fallback if
// Supabase database credentials are still placeholders or connecting offline.
const defaultAdminPass = process.env.DEFAULT_ADMIN_PASSWORD || 'admin123';
const fallbackStore = {
  admins: [
    {
      id: 1,
      email: process.env.DEFAULT_ADMIN_EMAIL || 'admin@example.com',
      password_hash: bcrypt.hashSync(defaultAdminPass, 10),
      name: process.env.DEFAULT_ADMIN_NAME || 'Admin User',
      role: 'admin',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
  ],
  inquiries: [
    {
      id: 1,
      name: 'Rahul Sharma',
      email: 'rahul@example.com',
      phone: '9876543210',
      user_type: 'Student',
      category: 'Admission',
      status: 'New',
      message: 'I would like to inquire about the upcoming batch for Grade 11 Science stream and scholarship entrance test dates.',
      created_at: new Date(Date.now() - 2 * 86400000).toISOString()
    },
    {
      id: 2,
      name: 'Priya Das',
      email: 'priya@example.com',
      phone: '9123456789',
      user_type: 'Parent',
      category: 'Scholarship',
      status: 'In Progress',
      message: 'My daughter scored 94% in Class 10. Could you please share the eligibility criteria and documentation for the merit scholarship?',
      created_at: new Date(Date.now() - 3 * 86400000).toISOString()
    },
    {
      id: 3,
      name: 'Green Valley School',
      email: 'contact@gvs.edu',
      phone: '9988776655',
      user_type: 'School',
      category: 'Concert',
      status: 'Resolved',
      message: 'We are interested in booking the annual inter-school music concert workshop for 350 participating students.',
      created_at: new Date(Date.now() - 4 * 86400000).toISOString()
    },
    {
      id: 4,
      name: 'Amit Kumar',
      email: 'amit@example.com',
      phone: '9001122334',
      user_type: 'Student',
      category: 'General Query',
      status: 'New',
      message: 'Could you let me know if there are weekend doubt-clearing sessions available for remote students?',
      created_at: new Date(Date.now() - 5 * 86400000).toISOString()
    },
    {
      id: 5,
      name: 'Sneha Patel',
      email: 'sneha@example.com',
      phone: '8899776655',
      user_type: 'Parent',
      category: 'Admission',
      status: 'In Progress',
      message: 'Looking for admission details for my son in Class 6 starting the next academic session.',
      created_at: new Date(Date.now() - 6 * 86400000).toISOString()
    },
    {
      id: 6,
      name: 'Sunrise Public School',
      email: 'info@sunrise.edu',
      phone: '7766554433',
      user_type: 'School',
      category: 'Scholarship',
      status: 'Resolved',
      message: 'Requesting partnership details for institutional student scholarship sponsorships.',
      created_at: new Date(Date.now() - 7 * 86400000).toISOString()
    }
  ]
};

// Initialize PostgreSQL Pool
if (connectionString && !connectionString.includes('placeholder')) {
  const isCloudOrSsl = 
    connectionString.includes('supabase') || 
    connectionString.includes('neon') || 
    connectionString.includes('sslmode') || 
    process.env.DB_SSL === 'true';

  pool = new Pool({
    connectionString,
    ssl: isCloudOrSsl ? { rejectUnauthorized: false } : false,
    max: 10,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 8000
  });

  pool.on('error', (err) => {
    console.error('Unexpected error on idle PostgreSQL client:', err.message);
  });
}

/**
 * Initialize database schema and tables on startup if connected to PostgreSQL
 */
async function initDb() {
  if (!pool) {
    console.log('ℹ️ No valid DATABASE_URL provided. Running with in-memory store for instant demonstration.');
    return;
  }

  try {
    const client = await pool.connect();
    isPostgresConnected = true;
    console.log('✅ Successfully connected to Supabase PostgreSQL Database.');

    // Create admins table
    await client.query(`
      CREATE TABLE IF NOT EXISTS admins (
        id SERIAL PRIMARY KEY,
        email VARCHAR(150) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        name VARCHAR(100) DEFAULT 'Admin',
        role VARCHAR(50) DEFAULT 'admin',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Create inquiries table
    await client.query(`
      CREATE TABLE IF NOT EXISTS inquiries (
        id SERIAL PRIMARY KEY,
        name VARCHAR(150) NOT NULL,
        email VARCHAR(150) NOT NULL,
        phone VARCHAR(25) NOT NULL,
        user_type VARCHAR(50) NOT NULL,
        category VARCHAR(50) NOT NULL,
        message TEXT NOT NULL,
        status VARCHAR(30) DEFAULT 'New',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Create indexes
    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_inquiries_category ON inquiries (category);
      CREATE INDEX IF NOT EXISTS idx_inquiries_user_type ON inquiries (user_type);
      CREATE INDEX IF NOT EXISTS idx_inquiries_status ON inquiries (status);
      CREATE INDEX IF NOT EXISTS idx_inquiries_created_at ON inquiries (created_at DESC);
    `);

    // Ensure default admin exists
    const defaultEmail = process.env.DEFAULT_ADMIN_EMAIL || 'admin@example.com';
    const defaultPassword = process.env.DEFAULT_ADMIN_PASSWORD || 'admin123';
    const adminCheck = await client.query('SELECT id FROM admins WHERE email = $1', [defaultEmail]);

    if (adminCheck.rows.length === 0) {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(defaultPassword, salt);
      await client.query(
        'INSERT INTO admins (email, password_hash, name, role) VALUES ($1, $2, $3, $4)',
        [defaultEmail, hash, process.env.DEFAULT_ADMIN_NAME || 'Admin User', 'admin']
      );
      console.log(`👤 Seeded default admin: ${defaultEmail}`);
    }

    client.release();
  } catch (error) {
    isPostgresConnected = false;
    console.warn('⚠️ Could not connect to PostgreSQL instance:', error.message);
    console.warn('⚠️ Operating in fallback in-memory mode. Update DATABASE_URL in .env to connect to your live Supabase database.');
  }
}

/**
 * Execute query against PostgreSQL or fallback
 */
async function query(text, params = []) {
  if (isPostgresConnected && pool) {
    return pool.query(text, params);
  }
  return null;
}

module.exports = {
  pool,
  query,
  initDb,
  fallbackStore,
  getIsConnected: () => isPostgresConnected
};
