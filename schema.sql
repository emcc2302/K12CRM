-- =======================================================
-- EdTech CRM & Inquiry System Database Schema
-- Compatible with Supabase PostgreSQL
-- =======================================================

-- Enable UUID extension if needed (optional)
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 1. Admins Table
CREATE TABLE IF NOT EXISTS admins (
    id SERIAL PRIMARY KEY,
    email VARCHAR(150) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(100) DEFAULT 'Admin',
    role VARCHAR(50) DEFAULT 'admin',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Inquiries Table
CREATE TABLE IF NOT EXISTS inquiries (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    email VARCHAR(150) NOT NULL,
    phone VARCHAR(25) NOT NULL,
    user_type VARCHAR(50) NOT NULL CHECK (user_type IN ('Parent', 'Student', 'School')),
    category VARCHAR(50) NOT NULL CHECK (category IN ('Scholarship', 'Concert', 'Admission', 'General Query')),
    message TEXT NOT NULL,
    status VARCHAR(30) DEFAULT 'New' CHECK (status IN ('New', 'In Progress', 'Resolved')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Indexes for Fast Searching & Filtering
CREATE INDEX IF NOT EXISTS idx_inquiries_category ON inquiries (category);
CREATE INDEX IF NOT EXISTS idx_inquiries_user_type ON inquiries (user_type);
CREATE INDEX IF NOT EXISTS idx_inquiries_status ON inquiries (status);
CREATE INDEX IF NOT EXISTS idx_inquiries_created_at ON inquiries (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_inquiries_name_phone ON inquiries (name, phone);

-- =======================================================
-- Sample Seed Data
-- =======================================================

-- Default Admin Account:
-- Email: admin@example.com
-- Password: admin123
INSERT INTO admins (email, password_hash, name, role)
VALUES (
    'admin@example.com',
    '$2b$10$55q51EafK0KvAtqefYRlIuO4u0SVQ/hWGh5koWJdSM99W9o9LOE72', -- bcrypt hash of admin123
    'Admin User',
    'admin'
)
ON CONFLICT (email) DO NOTHING;

-- Initial Inquiries matching reference UI
INSERT INTO inquiries (name, email, phone, user_type, category, status, message, created_at)
VALUES 
('Rahul Sharma', 'rahul@example.com', '9876543210', 'Student', 'Admission', 'New', 'I would like to inquire about the upcoming batch for Grade 11 Science stream and scholarship entrance test dates.', NOW() - INTERVAL '2 days'),
('Priya Das', 'priya@example.com', '9123456789', 'Parent', 'Scholarship', 'In Progress', 'My daughter scored 94% in Class 10. Could you please share the eligibility criteria and documentation for the merit scholarship?', NOW() - INTERVAL '3 days'),
('Green Valley School', 'contact@gvs.edu', '9988776655', 'School', 'Concert', 'Resolved', 'We are interested in booking the annual inter-school music concert workshop for 350 participating students.', NOW() - INTERVAL '4 days'),
('Amit Kumar', 'amit@example.com', '9001122334', 'Student', 'General Query', 'New', 'Could you let me know if there are weekend doubt-clearing sessions available for remote students?', NOW() - INTERVAL '5 days'),
('Sneha Patel', 'sneha@example.com', '8899776655', 'Parent', 'Admission', 'In Progress', 'Looking for admission details for my son in Class 6 starting the next academic session.', NOW() - INTERVAL '6 days'),
('Sunrise Public School', 'info@sunrise.edu', '7766554433', 'School', 'Scholarship', 'Resolved', 'Requesting partnership details for institutional student scholarship sponsorships.', NOW() - INTERVAL '7 days'),
('Ananya Roy', 'ananya.roy@example.com', '9811223344', 'Student', 'Scholarship', 'New', 'Inquiring about talent-based sports and cultural scholarships for higher secondary classes.', NOW() - INTERVAL '1 day'),
('Vikram Malhotra', 'vikram.m@example.com', '9722334455', 'Parent', 'Concert', 'In Progress', 'Want to know more details about tickets and student participation in the winter cultural concert.', NOW() - INTERVAL '8 hours'),
('Delhi Modern Academy', 'admin@dma.edu.in', '9633445566', 'School', 'Admission', 'New', 'Seeking bulk admission assessment kits and portal access for our branch students.', NOW() - INTERVAL '2 hours');
