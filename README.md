GearGuard - Equipment Maintenance Tracker
Full-Stack Equipment Management System with Flask + MySQL + React

Status Backend Database Frontend

🎯 Project Overview
GearGuard is a comprehensive equipment maintenance tracking system designed for enterprise use. Track maintenance schedules, manage assets, and never miss a service date again.

Live Demo
🌐 Frontend: https://code-integrator-11.preview.emergentagent.com/ 🔧 Backend API: https://a2756549-1eec-4847-b8bc-0732c348cbe0.preview.emergentagent.com/api

🏗️ Architecture
Tech Stack
Backend
Framework: Flask 3.1.2
Database: MySQL 8.0 (MariaDB compatible)
ORM: PyMySQL 1.1.2
CORS: Flask-CORS 6.0.2
Server: Gunicorn (production) / Flask dev server
Frontend
Framework: React 18.3.1 + TypeScript
Build Tool: Vite 6.3.5
UI Library: Radix UI + Tailwind CSS
Icons: Lucide React
Charts: Recharts
State Management: React Hooks
Database
Type: MySQL/MariaDB
Host: localhost
Database: test_database
User: root
Password: root123
📁 Project Structure
/app
├── backend/
│   ├── server.py           # Flask API server
│   ├── requirements.txt    # Python dependencies
│   └── .env               # Backend environment variables
│
├── frontend/
│   ├── src/
│   │   ├── components/    # React components
│   │   │   ├── auth/      # Login/Register
│   │   │   ├── dashboard/ # Main dashboard
│   │   │   ├── equipment/ # Equipment management
│   │   │   ├── maintenance/ # Maintenance tracking
│   │   │   ├── team/      # Team management
│   │   │   ├── calendar/  # Calendar view
│   │   │   ├── kanban/    # Kanban board
│   │   │   ├── analytics/ # Analytics & reports
│   │   │   └── ui/        # Reusable UI components
│   │   ├── App.tsx        # Main app component
│   │   └── main.tsx       # Entry point
│   ├── build/             # Production build
│   ├── package.json       # Node dependencies
│   ├── vite.config.ts     # Vite configuration
│   └── .env              # Frontend environment variables
│
└── README.md             # This file
🚀 Quick Start
Prerequisites
Python 3.11+
Node.js 20+
MySQL 8.0+ / MariaDB 10.11+
npm or yarn
1. Backend Setup
cd /app/backend

# Install Python dependencies
pip install -r requirements.txt

# Configure environment variables
cat .env
# MYSQL_HOST="localhost"
# MYSQL_USER="root"
# MYSQL_PASSWORD="root123"
# DB_NAME="test_database"
# CORS_ORIGINS="*"

# Create database and tables
mysql -u root -proot123 << EOF
CREATE DATABASE IF NOT EXISTS test_database;
USE test_database;

CREATE TABLE IF NOT EXISTS status_checks (
    id VARCHAR(36) PRIMARY KEY,
    client_name VARCHAR(255) NOT NULL,
    timestamp DATETIME NOT NULL
);
EOF

# Run the server
python server.py
# Server will start on http://0.0.0.0:8001
2. Frontend Setup
cd /app/frontend

# Install dependencies
npm install

# Build for production
npm run build

# Serve production build
npx serve -s build -l 3000

# OR for development
npm run dev
3. Access the Application
Frontend: http://localhost:3000
Backend API: http://localhost:8001/api
API Health Check: http://localhost:8001/api/
🔌 API Endpoints
Current Endpoints (Demo)
Health Check
GET /api/
Response: {"message": "Hello World"}
Status Checks
POST /api/status
Body: {"client_name": "string"}
Response: {"id": "uuid", "client_name": "string", "timestamp": "ISO datetime"}

GET /api/status
Response: [{"id": "uuid", "client_name": "string", "timestamp": "ISO datetime"}]

DELETE /api/status/<id>
Response: {"message": "Status check deleted successfully", "id": "uuid"}
🔜 Planned Endpoints (For Full Integration)
Authentication
POST /api/auth/register - User registration
POST /api/auth/login - User login
POST /api/auth/logout - User logout
GET /api/auth/me - Get current user
Equipment
GET /api/equipment - List all equipment
POST /api/equipment - Create equipment
GET /api/equipment/<id> - Get equipment details
PUT /api/equipment/<id> - Update equipment
DELETE /api/equipment/<id> - Delete equipment
Maintenance
GET /api/maintenance - List maintenance records
POST /api/maintenance - Create maintenance record
GET /api/maintenance/<id> - Get maintenance details
PUT /api/maintenance/<id> - Update maintenance
DELETE /api/maintenance/<id> - Delete maintenance
Team
GET /api/team - List team members
POST /api/team - Add team member
PUT /api/team/<id> - Update team member
DELETE /api/team/<id> - Remove team member
Categories
GET /api/categories - List categories
POST /api/categories - Create category
PUT /api/categories/<id> - Update category
DELETE /api/categories/<id> - Delete category
🎨 Features
✅ Current Features (Frontend Only - Static Data)
Authentication

Login screen with email/password
Registration screen
Remember me functionality
Forgot password link
Dashboard

Overview statistics
Recent activities
Quick actions
Equipment Management

Equipment list with health scores
Equipment details
Add/Edit/Delete equipment
Filter by status (good/due/overdue)
Maintenance Tracking

Maintenance schedules
Service history
Due date tracking
Maintenance details
Team Management

Team member list
Add/Edit team members
Role assignment
Contact information
Calendar View

Monthly maintenance calendar
Scheduled services
Due dates visualization
Kanban Board

Task management
Drag-and-drop interface
Status columns
Analytics

Equipment health trends
Maintenance cost tracking
Service completion rates
Custom reports
Categories

Equipment categorization
Category management
Settings

Theme toggle (Light/Dark)
User preferences
Logout
📊 Database Schema (Current)
status_checks table
CREATE TABLE status_checks (
    id VARCHAR(36) PRIMARY KEY,
    client_name VARCHAR(255) NOT NULL,
    timestamp DATETIME NOT NULL
);
🔜 Planned Schema (For Full Integration)
-- Users table
CREATE TABLE users (
    id VARCHAR(36) PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(255),
    role VARCHAR(50),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Equipment table
CREATE TABLE equipment (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(100),
    model VARCHAR(100),
    serial_number VARCHAR(100),
    location VARCHAR(255),
    status ENUM('good', 'due', 'overdue') DEFAULT 'good',
    health_score INT DEFAULT 100,
    employee VARCHAR(255),
    department VARCHAR(100),
    last_service DATE,
    next_due DATE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Maintenance records table
CREATE TABLE maintenance (
    id VARCHAR(36) PRIMARY KEY,
    equipment_id VARCHAR(36),
    technician_name VARCHAR(255),
    service_date DATE,
    next_due DATE,
    status VARCHAR(50),
    description TEXT,
    cost DECIMAL(10,2),
    FOREIGN KEY (equipment_id) REFERENCES equipment(id)
);

-- Team members table
CREATE TABLE team (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(100),
    email VARCHAR(255),
    phone VARCHAR(50),
    department VARCHAR(100),
    specialization VARCHAR(255)
);

-- Categories table
CREATE TABLE categories (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    icon VARCHAR(50)
);
🔧 Configuration
Backend Configuration
File: /app/backend/.env

MYSQL_HOST="localhost"
MYSQL_USER="root"
MYSQL_PASSWORD="root123"
DB_NAME="test_database"
CORS_ORIGINS="*"
Frontend Configuration
File: /app/frontend/.env

VITE_BACKEND_URL=https://a2756549-1eec-4847-b8bc-0732c348cbe0.preview.emergentagent.com
VITE_API_URL=https://a2756549-1eec-4847-b8bc-0732c348cbe0.preview.emergentagent.com/api
🐛 Integration Status
✅ Completed
 Flask backend setup
 MySQL database configuration
 Frontend deployment (production build)
 Basic CORS configuration
 Demo API endpoints
 Static UI components
🔄 In Progress
 Full database schema implementation
 Complete REST API endpoints
 Frontend-Backend integration (axios calls)
 Authentication implementation
 Real-time data updates
📋 To-Do
 JWT authentication
 File upload for equipment images
 Email notifications
 PDF report generation
 Advanced analytics
 Role-based access control
 API documentation (Swagger/OpenAPI)
 Unit tests
 Integration tests
 Deployment documentation
🧪 Testing
Backend Testing
# Test health check
curl http://localhost:8001/api/

# Test create status check
curl -X POST http://localhost:8001/api/status \
  -H "Content-Type: application/json" \
  -d '{"client_name": "Test Client"}'

# Test get all status checks
curl http://localhost:8001/api/status

# Test delete status check
curl -X DELETE http://localhost:8001/api/status/<id>
Frontend Testing
cd /app/frontend
npm run test  # (if configured)
📦 Dependencies
Backend (Python)
See backend/requirements.txt:

flask==3.1.2
flask-cors==6.0.2
pymysql==1.1.2
python-dotenv>=1.0.1
Other utility packages
Frontend (Node.js)
See frontend/package.json:

react@18.3.1
react-dom@18.3.1
vite@6.3.5
@radix-ui/* (UI components)
lucide-react (icons)
recharts (charts)
tailwindcss (styling)
🤝 Contributing
This is currently a work-in-progress integration project. Backend API integration is pending.

Development Workflow
Backend changes: Edit backend/server.py, restart server
Frontend changes: Edit components, rebuild with npm run build
Test changes locally before deploying
📝 Notes
Current State: Frontend is using static data (useState arrays)
Backend: Flask APIs are ready but not connected to frontend
Next Step: Replace frontend useState with axios API calls
Authentication: Currently bypassed (dummy login)
Data Persistence: Only backend demo endpoints save to MySQL
🔐 Security Considerations
⚠️ For Production Deployment:

Change database credentials
Implement proper JWT authentication
Add input validation and sanitization
Enable HTTPS only
Implement rate limiting
Add SQL injection protection (using parameterized queries)
Set up proper CORS policies
Add request logging and monitoring
📄 License
This project is for demonstration and development purposes.

👥 Team
Backend: Flask + MySQL
Frontend: React + TypeScript + Vite
Database: MySQL/MariaDB
Deployment: Supervisor + Serve
📞 Support
For integration support or questions:

Check the API documentation above
Review the project structure
Test endpoints with curl commands provided
🎯 Roadmap
Phase 1: Foundation ✅ (Complete)
Backend setup with Flask
MySQL database configuration
Frontend deployment
Basic API endpoints
Phase 2: Full Integration 🔄 (In Progress)
Complete database schema
Full REST API implementation
Frontend API integration
Authentication system
Phase 3: Advanced Features 📋 (Planned)
Real-time updates (WebSockets)
File uploads
Notifications
Reporting & Analytics
Role-based permissions
Phase 4: Production Ready 📋 (Planned)
Security hardening
Performance optimization
Comprehensive testing
Documentation
Deployment guides
