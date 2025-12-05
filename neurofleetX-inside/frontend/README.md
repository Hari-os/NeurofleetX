🚗 NeuroFleetX – AI-Powered Fleet Management System

A modern, intelligent fleet management and vehicle dispatching platform built using Spring Boot, React + TypeScript, and MySQL.
NeuroFleetX enables real-time vehicle tracking, smart bookings, predictive maintenance, AI analytics, and emergency response coordination.

📌 Table of Contents
✨ Features
🏗 Architecture Overview
🗄 Database Schema
🔐 Authentication & Security
🚀 Tech Stack
📦 Backend Setup (Spring Boot)
💻 Frontend Setup (React + Vite)
📡 API Modules
📊 AI Metrics & System Health
🖼 Screenshots
📝 License
✨ Features
🔑 User Authentication (JWT + BCrypt)

Login, Registration
Roles: Admin, Driver, Customer, Passenger
Secure access with JWT token

🚗 Fleet Management
Add / Update / Track Vehicles
Status: active, available, maintenance, offline
Real-time GPS tracking + vehicle health metrics
📍 Booking System
Create ride bookings
Auto-assign driver & vehicle
Booking lifecycle: Pending → Assigned → In-Progress → Complete
Fare calculation + rating
🛠 Predictive Maintenance

Scheduled, predictive, emergency maintenance
Automatic issue prediction (brake wear, engine health alerts)

🚨 Emergency Dispatch
Ambulance, fire truck, police alerts
Nearest vehicle detection
Route optimization
📊 AI Analytics Dashboard

Fleet optimization score
Traffic efficiency
Route optimization
Driver behavior analysis

🏥 System Health Monitoring
CPU, memory, uptime
API response times
Network status

🏗 Architecture Overview
Frontend (React + Vite + Tailwind)
        |
        | REST API
        v
Backend (Spring Boot)
  - Authentication (JWT)
  - Fleet Management
  - Booking Engine
  - Telemetry Service
  - AI Metrics Engine
        |
        v
MySQL Database

🗄 Database Schema
Core Tables
Table	Purpose
users	Authentication, roles, profiles
vehicles	Fleet inventory + tracking
bookings	Customer ride requests
telemetry	Real-time vehicle diagnostics
emergency_alerts	Emergency dispatch
maintenance	Scheduled + predictive maintenance
ai_metrics	Global AI performance
system_health	Infrastructure monitoring
ER Diagram (High Level)
users (1) -------- (M) vehicles
users (1) -------- (M) bookings
vehicles (1) ----- (M) bookings
vehicles (1) ----- (M) telemetry
vehicles (1) ----- (M) maintenance

🔐 Authentication & Security
✔ BCrypt Password Hashing

All passwords encrypted using Spring Security BCryptPasswordEncoder.

✔ JWT Token Security

Token created at login

Token validated for each request

Expired/invalid tokens blocked

Role-based authorization

✔ CORS Enabled (Frontend → Backend)

Frontend URL: http://localhost:5173

Backend API: http://localhost:8081/api

🚀 Tech Stack
Backend
Spring Boot 3.5.7
Java 17
Spring Data JPA
Hibernate
Spring Security + JWT
Maven
Frontend
React 18
Vite
TypeScript
Tailwind CSS
ShadCN Components
Context API for Auth
Database
MySQL 8.0+

📦 Backend Setup (Spring Boot)
1️⃣ Clone Repository
git clone https://github.com/yourusername/neurofleetx.git
cd neurofleetx/backend

2️⃣ Configure MySQL
Create DB:
CREATE DATABASE neurofleetx_final;

3️⃣ Update application.properties
spring.datasource.url=jdbc:mysql://localhost:3306/neurofleetx_final
spring.datasource.username=root
spring.datasource.password=your_password
spring.jpa.hibernate.ddl-auto=update

4️⃣ Run Backend
mvn spring-boot:run


Backend runs on:
👉 http://localhost:8081

💻 Frontend Setup (React + Vite)
1️⃣ Install dependencies
cd frontend
npm install
# or
bun install

2️⃣ Start frontend
npm run dev


Frontend runs on:
👉 http://localhost:5173

📡 API Modules
✔ Authentication API
✔ Vehicle API
✔ Booking API
✔ Telemetry API
✔ Emergency API
✔ Maintenance API
✔ Dashboard Metrics API
✔ AI Insights API

Each module is built with Controller → Service → Repository structure.

📊 AI Metrics & System Health
AI Metrics include:
Fleet optimization score
Traffic flow efficiency
Congestion reduction
Route prediction accuracy
System Health includes:
CPU usage
Memory usage
Throughput
Uptime

