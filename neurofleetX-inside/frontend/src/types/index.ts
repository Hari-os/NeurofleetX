export type UserRole = 'admin' | 'driver' | 'customer' | 'passenger';

export interface User {
  id: string;
  username: string;
  email: string;
  role: UserRole;
  createdAt: Date;
}

export interface Vehicle {
  id: string;
  model: string;
  type: 'sedan' | 'suv' | 'truck' | 'van' | 'bus';
  status: 'active' | 'maintenance' | 'available' | 'offline';
  licensePlate: string;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  fuel: number;
  health: number;
  mileage: number;
  driverId?: string;
  lastUpdate: Date;
}

export interface Booking {
  id: string;
  customerId: string;
  customerName: string;
  vehicleId?: string;
  driverId?: string;
  status: 'pending' | 'assigned' | 'in_progress' | 'completed' | 'cancelled';
  pickup: {
    lat: number;
    lng: number;
    address: string;
  };
  destination: {
    lat: number;
    lng: number;
    address: string;
  };
  scheduledTime: Date;
  completedTime?: Date;
  fare?: number;
  rating?: number;
}

export interface TelemetryData {
  vehicleId: string;
  timestamp: Date;
  location: {
    lat: number;
    lng: number;
  };
  speed: number;
  fuel: number;
  engineHealth: number;
  brakeHealth: number;
  tireHealth: number;
}

export interface EmergencyAlert {
  id: string;
  type: 'ambulance' | 'fire_truck' | 'police' | 'emergency_vehicle';
  severity: 'high' | 'medium' | 'low';
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  destination: {
    lat: number;
    lng: number;
    address: string;
  };
  status: 'active' | 'responding' | 'resolved';
  timestamp: Date;
  estimatedArrival?: number;
}

export interface AIMetrics {
  fleetOptimizationScore: number;
  trafficFlowEfficiency: number;
  signalTimingOptimization: number;
  congestionReduction: number;
  emergencyResponseTime: number;
  tropicalOptimization: {
    status: 'active' | 'inactive';
    patternRecognition: boolean;
    routeOptimization: number;
    predictionAnalysis: boolean;
  };
}

export interface SystemHealth {
  uptime: number;
  responseTime: number;
  dataProcessingSpeed: number;
  networkStatus: 'optimal' | 'degraded' | 'critical';
  processingThroughput: number;
  cpuUsage: number;
  memoryUsage: number;
}

export interface MaintenanceRecord {
  id: string;
  vehicleId: string;
  type: 'scheduled' | 'predictive' | 'emergency';
  description: string;
  status: 'pending' | 'in_progress' | 'completed';
  predictedIssue?: string;
  estimatedCost: number;
  scheduledDate: Date;
  completedDate?: Date;
}

export interface DashboardStats {
  totalVehicles: number;
  activeVehicles: number;
  inServiceVehicles: number;
  offlineVehicles: number;
  currentBookings: number;
  todayRevenue: number;
  fuelEfficiency: number;
  avgVehicleHealth: number;
}

export interface TrafficAnalysis {
  peakType: 'morning' | 'evening';
  avgTravelTime: number;
  baseSpeed: number;
  congestionLevel: number;
  optimizedRoutes: number;
}
