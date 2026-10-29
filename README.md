# EduCRM - EdTech CRM & Inquiry System

A modern full-stack CRM inquiry management system built with **React**, **Node.js (Express)**, **Custom JWT-based Authentication**, and **Supabase (PostgreSQL)**. 

The user interface is modeled to match the provided UI design reference across all 4 key views:
1. **Public Landing Hero Section** ("Have a Question? We're Here to Help" with trust indicators and learner visuals).
2. **Public Inquiry Submission Form** (User type and category dropdowns, personal details, message, and direct database persistence).
3. **Admin Login Page** (Split-screen navy/indigo branding with bullet points and clean credentials card).
4. **Admin Dashboard** (Header bar, category/user-type filters, search bar, 4 KPI stat cards, inquiries table with status badges and actions).

---

## 🌟 Tech Stack & Architecture

- **Frontend:** React 19 (Vite), Tailwind CSS, Lucide React Icons
- **Backend:** Node.js, Express.js
- **Database:** Supabase (PostgreSQL) using standard `pg` connection pool with SSL
- **Authentication:** Custom JWT-based Authentication from scratch (Bcrypt password hashing, JWT generation, and protected route middleware; strictly independent of Supabase Auth)
- **Deployment Ready:** Vercel / Netlify (Frontend) + Render / Railway (Backend) + Supabase (Database)

---

## 🚀 Core Features

### 1. Public Inquiry Form
- Clean and responsive form matching the reference specification:
  - **User Type (Dropdown):** `Parent` / `Student` / `School`
  - **Category (Dropdown):** `Scholarship` / `Concert` / `Admission` / `General Query`
  - **Personal Details:** Name, Email, Phone Number
  - **Message / Query:** Text area
- Real-time client-side validation for email formats and required inputs.
- Submitting saves directly into Supabase PostgreSQL database.

### 2. Custom JWT Admin Authentication
- Implemented entirely in the Express backend:
  - Password hashing with **Bcrypt** (10 salt rounds).
  - JWT token generation using `jsonwebtoken`.
  - Protected route middleware (`authenticateToken`) checking `Authorization: Bearer <token>`.
  - Secure session handling with automatic session expiry management.

### 3. Admin Dashboard & Inquiries Management
- **Protected Route:** Accessible only to authenticated admins.
- **Tabular View:** Shows all inquiries with columns: `#`, `Name`, `Email`, `Phone`, `User Type`, `Category`, `Status`, `Date`, and `Action`.
- **KPI Stat Cards:** Total Inquiries, New, In Progress, Resolved.
- **Inquiry Details Modal:** View full query text, quick status changes, direct mailto/tel shortcuts, and deletion.

### 4. Advanced Filters & Search
- **Filter by Category:** `Scholarship`, `Concert`, `Admission`, `General Query`
- **Filter by User Type:** `Parent`, `Student`, `School`
- **Filter by Status:** `New`, `In Progress`, `Resolved`
- **Search Bar:** Real-time search across Name and Phone numbers.
- **Reset Button:** One-click reset returning to all submissions.

---

## 📁 Repository Structure

```text
k12Hunar/
├── backend/
│   ├── config/
│   │   └── db.js                 # Supabase PostgreSQL Pool & Auto-Init Schema
│   ├── controllers/
│   │   ├── authController.js     # Custom JWT login & admin profile
│   │   └── inquiryController.js  # Inquiry submission, filtered search, updates
│   ├── middleware/
│   │   └── authMiddleware.js     # Custom JWT verification middleware
│   ├── routes/
│   │   ├── authRoutes.js         # /api/auth routes
│   │   └── inquiryRoutes.js      # /api/inquiries routes
│   ├── scripts/
│   │   └── seed.js               # CLI database seeding script
│   ├── .env.example              # Backend environment template
│   ├── package.json
│   ├── schema.sql                # SQL table creation & seed queries
│   └── server.js                 # Express application entrypoint
├── frontend/
│   ├── public/                   # Static assets & favicon
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── HeroSection.jsx
│   │   │   ├── InquiryForm.jsx
│   │   │   └── InquiryDetailModal.jsx
│   │   ├── pages/
│   │   │   ├── HomePage.jsx
│   │   │   ├── AdminLoginPage.jsx
│   │   │   └── AdminDashboardPage.jsx
│   │   ├── services/
│   │   │   └── api.js            # API client with JWT bearer interceptor
│   │   ├── App.jsx
│   │   ├── index.css             # Tailwind base & custom scrollbars
│   │   └── main.jsx
│   ├── .env.example              # Frontend environment template
│   ├── index.html
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
├── schema.sql                    # Root copy of database schema
├── .env.example                  # Root environment template
├── package.json                  # Root scripts for running full-stack app
└── README.md
```

---

## ⚙️ Environment Variables Setup

### Backend (`backend/.env`)

Copy `backend/.env.example` to `backend/.env`:

```bash
cp backend/.env.example backend/.env
```

Configure your variables:

```env
# Server Port
PORT=5000
NODE_ENV=development

# Supabase PostgreSQL Connection URI
# Obtained from: Supabase Dashboard -> Settings -> Database -> Connection String (URI / Pooler)
DATABASE_URL=postgresql://postgres.[YOUR-PROJECT-REF]:[YOUR-PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres?sslmode=require

# Custom JWT Authentication Secret
JWT_SECRET=your_super_secret_jwt_key_here_min_32_characters

# Default Initial Admin Credentials
DEFAULT_ADMIN_EMAIL=admin@example.com
DEFAULT_ADMIN_PASSWORD=admin123
DEFAULT_ADMIN_NAME=Admin User
```

### Frontend (`frontend/.env`)

Copy `frontend/.env.example` to `frontend/.env`:

```bash
cp frontend/.env.example frontend/.env
```

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

> **Security Note:** Secret credentials and database passwords are kept strictly inside `.env` and are excluded from Git via `.gitignore`.

---

## 🗄️ Database Setup (Supabase)

You can initialize the database using either of the two methods below:

### Method 1: Using Supabase SQL Editor (Recommended)
1. Go to your [Supabase Dashboard](https://supabase.com).
2. Navigate to **SQL Editor** in the left sidebar.
3. Open [`schema.sql`](./schema.sql) from the repository, paste the queries into the editor, and click **Run**.
4. This will create the `admins` and `inquiries` tables, indexes, and initial sample records.

### Method 2: Using the Built-in Seed Script
Once your `DATABASE_URL` is set in `backend/.env`, run:
```bash
cd backend
npm run seed
```

---

## 🛠️ Running Locally

### Step 1: Install Dependencies

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### Step 2: Start Backend Server

```bash
cd backend
npm start
```
The backend API server will run at `http://localhost:5000`.

### Step 3: Start Frontend Dev Server

```bash
cd frontend
npm run dev
```
The React frontend will run at `http://localhost:5173`.

---

## 🔐 Testing the Custom JWT Authentication

### Default Admin Credentials
- **Email:** `admin@example.com`
- **Password:** `admin123`

### Testing via the Frontend UI
1. Open `http://localhost:5173`.
2. Click **Admin Login** in the navigation header.
3. You can either type the credentials or click the **Autofill** button.
4. Click **Sign In →**. The backend will verify the bcrypt password hash and issue a JWT token.
5. You are redirected to the protected `/dashboard` showing all submitted inquiries.

### Testing via cURL / Postman

**1. Login & Obtain JWT Token:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"admin123"}'
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsIn...",
  "admin": {
    "id": 1,
    "email": "admin@example.com",
    "name": "Admin User",
    "role": "admin"
  }
}
```

**2. Access Protected Inquiries API using the Bearer Token:**
```bash
curl -X GET "http://localhost:5000/api/inquiries?category=Scholarship" \
  -H "Authorization: Bearer <PASTE_TOKEN_HERE>"
```

---

## 📡 API Endpoints Reference

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/api/health` | Public | Health check and database connection status |
| `POST` | `/api/inquiries` | Public | Submit new public inquiry form |
| `POST` | `/api/auth/login` | Public | Admin login, bcrypt verification, JWT generation |
| `GET` | `/api/auth/me` | Protected | Current authenticated admin profile |
| `GET` | `/api/inquiries` | Protected | List inquiries with category, user_type, status filters & search |
| `PATCH` | `/api/inquiries/:id/status` | Protected | Update status (`New`, `In Progress`, `Resolved`) |
| `DELETE` | `/api/inquiries/:id` | Protected | Delete an inquiry |
| `GET` | `/api/inquiries/stats` | Protected | Aggregated KPI stats and category/type counts |

---

## 🌐 Deployment Instructions

- **Frontend (Vercel / Netlify):**
  - Root directory: `frontend`
  - Build command: `npm run build`
  - Output directory: `dist`
  - Environment variable: `VITE_API_BASE_URL` pointing to the deployed backend URL.

- **Backend (Render / Railway):**
  - Root directory: `backend`
  - Build command: `npm install`
  - Start command: `node server.js`
  - Environment variables: `DATABASE_URL`, `JWT_SECRET`, `PORT=5000`.

---

## 📄 License
ISC License &copy; EduCRM

