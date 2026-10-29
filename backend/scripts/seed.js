const { Pool } = require('pg');
const path = require('path');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');

dotenv.config({ path: path.join(__dirname, '..', '.env') });
dotenv.config();

const connectionString = process.env.DATABASE_URL;

if (!connectionString || connectionString.includes('placeholder')) {
  console.log('⚠️ No live DATABASE_URL provided. Please configure your Supabase connection string in backend/.env before running seed.');
  process.exit(0);
}

const isCloudOrSsl = 
  connectionString.includes('supabase') || 
  connectionString.includes('neon') || 
  connectionString.includes('sslmode') || 
  process.env.DB_SSL === 'true';

const pool = new Pool({
  connectionString,
  ssl: isCloudOrSsl ? { rejectUnauthorized: false } : false
});

async function runSeed() {
  console.log('🌱 Starting Supabase PostgreSQL Database Seed...');
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    // Create tables
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

    // Indexes
    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_inquiries_category ON inquiries (category);
      CREATE INDEX IF NOT EXISTS idx_inquiries_user_type ON inquiries (user_type);
      CREATE INDEX IF NOT EXISTS idx_inquiries_status ON inquiries (status);
      CREATE INDEX IF NOT EXISTS idx_inquiries_created_at ON inquiries (created_at DESC);
    `);

    // Create default admin
    const adminEmail = process.env.DEFAULT_ADMIN_EMAIL || 'admin@example.com';
    const adminPassword = process.env.DEFAULT_ADMIN_PASSWORD || 'admin123';
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(adminPassword, salt);

    await client.query(
      `INSERT INTO admins (email, password_hash, name, role)
       VALUES ($1, $2, $3, 'admin')
       ON CONFLICT (email) 
       DO UPDATE SET password_hash = EXCLUDED.password_hash`,
      [adminEmail, passwordHash, process.env.DEFAULT_ADMIN_NAME || 'Admin User']
    );
    console.log(`✅ Admin account configured: ${adminEmail} (password: ${adminPassword})`);

    // Seed sample inquiries
    const sampleInquiries = [
      ['Rahul Sharma', 'rahul@example.com', '9876543210', 'Student', 'Admission', 'New', 'I would like to inquire about the upcoming batch for Grade 11 Science stream and scholarship entrance test dates.'],
      ['Priya Das', 'priya@example.com', '9123456789', 'Parent', 'Scholarship', 'In Progress', 'My daughter scored 94% in Class 10. Could you please share the eligibility criteria and documentation for the merit scholarship?'],
      ['Green Valley School', 'contact@gvs.edu', '9988776655', 'School', 'Concert', 'Resolved', 'We are interested in booking the annual inter-school music concert workshop for 350 participating students.'],
      ['Amit Kumar', 'amit@example.com', '9001122334', 'Student', 'General Query', 'New', 'Could you let me know if there are weekend doubt-clearing sessions available for remote students?'],
      ['Sneha Patel', 'sneha@example.com', '8899776655', 'Parent', 'Admission', 'In Progress', 'Looking for admission details for my son in Class 6 starting the next academic session.'],
      ['Sunrise Public School', 'info@sunrise.edu', '7766554433', 'School', 'Scholarship', 'Resolved', 'Requesting partnership details for institutional student scholarship sponsorships.'],
      ['Ananya Roy', 'ananya.roy@example.com', '9811223344', 'Student', 'Scholarship', 'New', 'Inquiring about talent-based sports and cultural scholarships for higher secondary classes.'],
      ['Vikram Malhotra', 'vikram.m@example.com', '9722334455', 'Parent', 'Concert', 'In Progress', 'Want to know more details about tickets and student participation in the winter cultural concert.'],
      ['Delhi Modern Academy', 'admin@dma.edu.in', '9633445566', 'School', 'Admission', 'New', 'Seeking bulk admission assessment kits and portal access for our branch students.']
    ];

    for (const inq of sampleInquiries) {
      await client.query(
        `INSERT INTO inquiries (name, email, phone, user_type, category, status, message)
         VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        inq
      );
    }
    console.log(`✅ Seeded ${sampleInquiries.length} sample inquiries successfully.`);

    await client.query('COMMIT');
    console.log('🎉 Supabase Database Seed completed successfully!');
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('❌ Error during seeding:', err);
  } finally {
    client.release();
    await pool.end();
  }
}

runSeed();
