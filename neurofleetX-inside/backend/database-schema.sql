-- NeuroFleetX MySQL Database Schema
-- Run this script to create the database structure

CREATE DATABASE IF NOT EXISTS neurofleetx_final;
USE neurofleetx_final;

-- Users Table
CREATE TABLE users (
    id VARCHAR(36) PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'driver', 'customer', 'passenger') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Vehicles Table
CREATE TABLE vehicles (
    id VARCHAR(20) PRIMARY KEY,
    model VARCHAR(100) NOT NULL,
    type ENUM('sedan', 'suv', 'truck', 'van', 'bus') NOT NULL,
    status ENUM('active', 'maintenance', 'available', 'offline') NOT NULL,
    license_plate VARCHAR(20) NOT NULL UNIQUE,
    location_lat DOUBLE,
    location_lng DOUBLE,
    location_address VARCHAR(255),
    fuel INT NOT NULL DEFAULT 100,
    health INT NOT NULL DEFAULT 100,
    mileage INT NOT NULL DEFAULT 0,
    driver_id VARCHAR(36),
    last_update TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (driver_id) REFERENCES users(id) ON DELETE SET NULL
);

-- Bookings Table
CREATE TABLE bookings (
    id VARCHAR(20) PRIMARY KEY,
    customer_id VARCHAR(36) NOT NULL,
    customer_name VARCHAR(100) NOT NULL,
    vehicle_id VARCHAR(20),
    driver_id VARCHAR(36),
    status ENUM('pending', 'assigned', 'in_progress', 'completed', 'cancelled') NOT NULL DEFAULT 'pending',
    pickup_lat DOUBLE NOT NULL,
    pickup_lng DOUBLE NOT NULL,
    pickup_address VARCHAR(255) NOT NULL,
    destination_lat DOUBLE NOT NULL,
    destination_lng DOUBLE NOT NULL,
    destination_address VARCHAR(255) NOT NULL,
    scheduled_time TIMESTAMP NOT NULL,
    completed_time TIMESTAMP,
    fare DECIMAL(10, 2),
    rating INT CHECK (rating >= 1 AND rating <= 5),
    FOREIGN KEY (vehicle_id) REFERENCES vehicles(id) ON DELETE SET NULL,
    FOREIGN KEY (driver_id) REFERENCES users(id) ON DELETE SET NULL
);

-- Telemetry Table
CREATE TABLE telemetry (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    vehicle_id VARCHAR(20) NOT NULL,
    timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    location_lat DOUBLE NOT NULL,
    location_lng DOUBLE NOT NULL,
    speed INT NOT NULL DEFAULT 0,
    fuel INT NOT NULL,
    engine_health INT NOT NULL,
    brake_health INT NOT NULL,
    tire_health INT NOT NULL,
    FOREIGN KEY (vehicle_id) REFERENCES vehicles(id) ON DELETE CASCADE,
    INDEX idx_vehicle_timestamp (vehicle_id, timestamp DESC)
);

-- Emergency Alerts Table
CREATE TABLE emergency_alerts (
    id VARCHAR(20) PRIMARY KEY,
    type ENUM('ambulance', 'fire_truck', 'police', 'emergency_vehicle') NOT NULL,
    severity ENUM('high', 'medium', 'low') NOT NULL,
    location_lat DOUBLE NOT NULL,
    location_lng DOUBLE NOT NULL,
    location_address VARCHAR(255) NOT NULL,
    destination_lat DOUBLE NOT NULL,
    destination_lng DOUBLE NOT NULL,
    destination_address VARCHAR(255) NOT NULL,
    status ENUM('active', 'responding', 'resolved') NOT NULL DEFAULT 'active',
    timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    estimated_arrival INT
);

-- Maintenance Table
CREATE TABLE maintenance (
    id VARCHAR(20) PRIMARY KEY,
    vehicle_id VARCHAR(20) NOT NULL,
    type ENUM('scheduled', 'predictive', 'emergency') NOT NULL,
    description TEXT NOT NULL,
    status ENUM('pending', 'in_progress', 'completed') NOT NULL DEFAULT 'pending',
    predicted_issue TEXT,
    estimated_cost DECIMAL(10, 2),
    scheduled_date TIMESTAMP NOT NULL,
    completed_date TIMESTAMP,
    FOREIGN KEY (vehicle_id) REFERENCES vehicles(id) ON DELETE CASCADE
);

-- AI Metrics Table
CREATE TABLE ai_metrics (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    fleet_optimization_score INT NOT NULL,
    traffic_flow_efficiency INT NOT NULL,
    signal_timing_optimization INT NOT NULL,
    congestion_reduction INT NOT NULL,
    emergency_response_time INT NOT NULL,
    tropical_status VARCHAR(20),
    pattern_recognition BOOLEAN DEFAULT TRUE,
    route_optimization INT,
    prediction_analysis BOOLEAN DEFAULT TRUE,
    recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- System Health Table
CREATE TABLE system_health (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    uptime DOUBLE NOT NULL,
    response_time INT NOT NULL,
    data_processing_speed INT NOT NULL,
    network_status ENUM('optimal', 'degraded', 'critical') NOT NULL,
    processing_throughput INT NOT NULL,
    cpu_usage INT NOT NULL,
    memory_usage INT NOT NULL,
    recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Ratings Table (for driver ratings)
CREATE TABLE ratings (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    booking_id VARCHAR(20) NOT NULL,
    driver_id VARCHAR(36) NOT NULL,
    customer_id VARCHAR(36) NOT NULL,
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (booking_id) REFERENCES bookings(id) ON DELETE CASCADE,
    FOREIGN KEY (driver_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (customer_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Create indexes for better performance
CREATE INDEX idx_bookings_customer ON bookings(customer_id);
CREATE INDEX idx_bookings_driver ON bookings(driver_id);
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_vehicles_status ON vehicles(status);
CREATE INDEX idx_emergency_status ON emergency_alerts(status);
CREATE INDEX idx_maintenance_vehicle ON maintenance(vehicle_id);
