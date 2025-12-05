# NeuroFleetX Spring Boot Backend

## Prerequisites
- Java 17+
- Maven 3.8+
- MySQL 8.0+

## Setup Instructions

### 1. Create MySQL Database
```sql
CREATE DATABASE neurofleetx;
CREATE USER 'neurofleetx_user'@'localhost' IDENTIFIED BY 'your_secure_password';
GRANT ALL PRIVILEGES ON neurofleetx.* TO 'neurofleetx_user'@'localhost';
FLUSH PRIVILEGES;
```

### 2. Configure Application
Update `src/main/resources/application.properties` with your database credentials.

### 3. Run the Application
```bash
cd backend-springboot
mvn spring-boot:run
```

The API will be available at `http://localhost:8081/api`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Dashboard
- `GET /api/dashboard/stats` - Get dashboard statistics

### Vehicles
- `GET /api/vehicles` - Get all vehicles
- `GET /api/vehicles/{id}` - Get vehicle by ID
- `GET /api/vehicles/available` - Get available vehicles
- `PUT /api/vehicles/{id}` - Update vehicle

### Bookings
- `GET /api/bookings` - Get all bookings
- `POST /api/bookings` - Create booking
- `PUT /api/bookings/{id}/assign` - Assign vehicle to booking
- `PUT /api/bookings/{id}/status` - Update booking status

### Telemetry
- `GET /api/telemetry/live` - Get live telemetry data

### AI Metrics
- `GET /api/ai/metrics` - Get AI metrics
- `GET /api/ai/tropical` - Get tropical optimization status

### Emergency
- `GET /api/emergency/alerts` - Get emergency alerts
- `GET /api/emergency/routes` - Get emergency routes

### Maintenance
- `GET /api/maintenance` - Get maintenance records
- `GET /api/maintenance/predict` - Get predictive maintenance

### System
- `GET /api/system/health` - Get system health
- `GET /api/traffic/analysis` - Get traffic analysis

## Default Users
- Admin: admin@neurofleetx.com / admin123
- Driver: driver@neurofleetx.com / driver123
- Customer: customer@neurofleetx.com / customer123
