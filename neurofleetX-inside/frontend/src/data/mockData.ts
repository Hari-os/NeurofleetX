import { 
  Vehicle, 
  Booking, 
  EmergencyAlert, 
  AIMetrics, 
  SystemHealth, 
  DashboardStats,
  MaintenanceRecord,
  TelemetryData,
  TrafficAnalysis
} from '@/types';

// Hyderabad coordinates center
const HYDERABAD_CENTER = { lat: 17.385044, lng: 78.486671 };

const generateRandomLocation = (center: { lat: number; lng: number }, radiusKm: number = 15) => {
  const radiusDeg = radiusKm / 111;
  const lat = center.lat + (Math.random() - 0.5) * 2 * radiusDeg;
  const lng = center.lng + (Math.random() - 0.5) * 2 * radiusDeg;
  return { lat, lng };
};

const hyderabadAddresses = [
  'Hitech City, Hyderabad',
  'Banjara Hills, Hyderabad',
  'Jubilee Hills, Hyderabad',
  'Gachibowli, Hyderabad',
  'Madhapur, Hyderabad',
  'Kondapur, Hyderabad',
  'Kukatpally, Hyderabad',
  'Secunderabad Railway Station',
  'HITEC City Metro Station',
  'Charminar, Hyderabad',
  'Hussain Sagar Lake',
  'Rajiv Gandhi International Airport',
  'LB Nagar, Hyderabad',
  'Ameerpet, Hyderabad',
  'SR Nagar, Hyderabad',
];

export const mockVehicles: Vehicle[] = Array.from({ length: 25 }, (_, i) => {
  const location = generateRandomLocation(HYDERABAD_CENTER);
  const statuses: Vehicle['status'][] = ['active', 'active', 'active', 'maintenance', 'available', 'offline'];
  const types: Vehicle['type'][] = ['sedan', 'suv', 'truck', 'van', 'bus'];
  
  return {
    id: `VH-${String(i + 1).padStart(4, '0')}`,
    model: ['Toyota Innova', 'Maruti Swift', 'Hyundai Creta', 'Tata Nexon', 'Mahindra XUV700', 'Honda City'][i % 6],
    type: types[i % 5],
    status: statuses[Math.floor(Math.random() * statuses.length)],
    licensePlate: `TS ${String(Math.floor(Math.random() * 99)).padStart(2, '0')} AB ${String(Math.floor(Math.random() * 9999)).padStart(4, '0')}`,
    location: {
      ...location,
      address: hyderabadAddresses[i % hyderabadAddresses.length],
    },
    fuel: Math.floor(Math.random() * 60) + 40,
    health: Math.floor(Math.random() * 30) + 70,
    mileage: Math.floor(Math.random() * 100000) + 10000,
    driverId: i % 3 === 0 ? undefined : `DR-${String(i + 1).padStart(4, '0')}`,
    lastUpdate: new Date(Date.now() - Math.random() * 3600000),
  };
});

export const mockBookings: Booking[] = Array.from({ length: 15 }, (_, i) => {
  const pickupLoc = generateRandomLocation(HYDERABAD_CENTER);
  const destLoc = generateRandomLocation(HYDERABAD_CENTER);
  const statuses: Booking['status'][] = ['pending', 'assigned', 'in_progress', 'completed', 'cancelled'];
  
  return {
    id: `BK-${String(i + 1).padStart(6, '0')}`,
    customerId: `CU-${String(i + 1).padStart(4, '0')}`,
    customerName: ['Rahul Sharma', 'Priya Patel', 'Amit Kumar', 'Sneha Reddy', 'Vikram Singh'][i % 5],
    vehicleId: i % 3 !== 0 ? mockVehicles[i % mockVehicles.length].id : undefined,
    driverId: i % 3 !== 0 ? `DR-${String((i % 10) + 1).padStart(4, '0')}` : undefined,
    status: statuses[i % 5],
    pickup: {
      ...pickupLoc,
      address: hyderabadAddresses[i % hyderabadAddresses.length],
    },
    destination: {
      ...destLoc,
      address: hyderabadAddresses[(i + 5) % hyderabadAddresses.length],
    },
    scheduledTime: new Date(Date.now() + (i - 5) * 3600000),
    completedTime: i % 5 === 3 ? new Date(Date.now() - Math.random() * 86400000) : undefined,
    fare: i % 5 === 3 ? Math.floor(Math.random() * 500) + 200 : undefined,
    rating: i % 5 === 3 ? Math.floor(Math.random() * 2) + 4 : undefined,
  };
});

export const mockEmergencyAlerts: EmergencyAlert[] = [
  {
    id: 'EM-001',
    type: 'ambulance',
    severity: 'high',
    location: { lat: 17.4156, lng: 78.4347, address: 'Apollo Hospital, Jubilee Hills' },
    destination: { lat: 17.3850, lng: 78.4867, address: 'NIMS Hospital, Punjagutta' },
    status: 'responding',
    timestamp: new Date(),
    estimatedArrival: 8,
  },
  {
    id: 'EM-002',
    type: 'fire_truck',
    severity: 'high',
    location: { lat: 17.4435, lng: 78.3772, address: 'Fire Station, Kukatpally' },
    destination: { lat: 17.4615, lng: 78.3552, address: 'Industrial Area, JNTU' },
    status: 'active',
    timestamp: new Date(Date.now() - 600000),
    estimatedArrival: 12,
  },
  {
    id: 'EM-003',
    type: 'police',
    severity: 'medium',
    location: { lat: 17.3616, lng: 78.4747, address: 'Charminar Police Station' },
    destination: { lat: 17.3720, lng: 78.4800, address: 'Old City, Hyderabad' },
    status: 'responding',
    timestamp: new Date(Date.now() - 1200000),
    estimatedArrival: 5,
  },
];

export const mockAIMetrics: AIMetrics = {
  fleetOptimizationScore: 94.7,
  trafficFlowEfficiency: 87.3,
  signalTimingOptimization: 91.2,
  congestionReduction: 23.5,
  emergencyResponseTime: 4.2,
  tropicalOptimization: {
    status: 'active',
    patternRecognition: true,
    routeOptimization: 78,
    predictionAnalysis: true,
  },
};

export const mockSystemHealth: SystemHealth = {
  uptime: 99.97,
  responseTime: 45,
  dataProcessingSpeed: 12500,
  networkStatus: 'optimal',
  processingThroughput: 98.5,
  cpuUsage: 42,
  memoryUsage: 67,
};

export const mockDashboardStats: DashboardStats = {
  totalVehicles: mockVehicles.length,
  activeVehicles: mockVehicles.filter(v => v.status === 'active').length,
  inServiceVehicles: mockVehicles.filter(v => v.status === 'maintenance').length,
  offlineVehicles: mockVehicles.filter(v => v.status === 'offline').length,
  currentBookings: mockBookings.filter(b => ['pending', 'assigned', 'in_progress'].includes(b.status)).length,
  todayRevenue: 125750,
  fuelEfficiency: 14.5,
  avgVehicleHealth: Math.round(mockVehicles.reduce((acc, v) => acc + v.health, 0) / mockVehicles.length),
};

export const mockMaintenanceRecords: MaintenanceRecord[] = [
  {
    id: 'MN-001',
    vehicleId: 'VH-0003',
    type: 'predictive',
    description: 'Brake pad replacement predicted based on wear analysis',
    status: 'pending',
    predictedIssue: 'Brake pads at 15% remaining',
    estimatedCost: 4500,
    scheduledDate: new Date(Date.now() + 86400000 * 3),
  },
  {
    id: 'MN-002',
    vehicleId: 'VH-0007',
    type: 'scheduled',
    description: 'Regular 10,000 km service',
    status: 'in_progress',
    estimatedCost: 8000,
    scheduledDate: new Date(),
  },
  {
    id: 'MN-003',
    vehicleId: 'VH-0012',
    type: 'predictive',
    description: 'Engine oil temperature anomaly detected',
    status: 'pending',
    predictedIssue: 'Potential cooling system issue',
    estimatedCost: 12000,
    scheduledDate: new Date(Date.now() + 86400000 * 5),
  },
];

export const mockTelemetryData: TelemetryData[] = mockVehicles.slice(0, 10).map((vehicle, i) => ({
  vehicleId: vehicle.id,
  timestamp: new Date(),
  location: vehicle.location,
  speed: Math.floor(Math.random() * 60) + 20,
  fuel: vehicle.fuel,
  engineHealth: Math.floor(Math.random() * 20) + 80,
  brakeHealth: Math.floor(Math.random() * 25) + 75,
  tireHealth: Math.floor(Math.random() * 15) + 85,
}));

export const mockTrafficAnalysis: TrafficAnalysis = {
  peakType: 'morning',
  avgTravelTime: 32,
  baseSpeed: 28,
  congestionLevel: 65,
  optimizedRoutes: 847,
};

export const chartData = {
  fleetPerformance: [
    { name: '00:00', efficiency: 82, fuel: 75, health: 88 },
    { name: '04:00', efficiency: 78, fuel: 72, health: 87 },
    { name: '08:00', efficiency: 91, fuel: 68, health: 89 },
    { name: '12:00', efficiency: 88, fuel: 62, health: 86 },
    { name: '16:00', efficiency: 95, fuel: 58, health: 88 },
    { name: '20:00', efficiency: 86, fuel: 55, health: 85 },
  ],
  bookingTrends: [
    { name: 'Mon', bookings: 45 },
    { name: 'Tue', bookings: 52 },
    { name: 'Wed', bookings: 48 },
    { name: 'Thu', bookings: 61 },
    { name: 'Fri', bookings: 78 },
    { name: 'Sat', bookings: 89 },
    { name: 'Sun', bookings: 67 },
  ],
  vehicleTypes: [
    { name: 'Sedan', value: 35, color: '#00ffff' },
    { name: 'SUV', value: 28, color: '#a855f7' },
    { name: 'Van', value: 18, color: '#22c55e' },
    { name: 'Truck', value: 12, color: '#f59e0b' },
    { name: 'Bus', value: 7, color: '#ef4444' },
  ],
  revenueData: [
    { name: 'Week 1', revenue: 285000 },
    { name: 'Week 2', revenue: 312000 },
    { name: 'Week 3', revenue: 298000 },
    { name: 'Week 4', revenue: 345000 },
  ],
};
