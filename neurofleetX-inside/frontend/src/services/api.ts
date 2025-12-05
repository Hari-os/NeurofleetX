// API Configuration - Update this URL to point to your Spring Boot backend
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8081/api';

// Helper function to get auth token
const getAuthToken = (): string | null => {
  return localStorage.getItem('neurofleetx_token');
};

// Helper function for API calls
async function apiCall<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getAuthToken();
  
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Request failed' }));
    throw new Error(error.message || `HTTP error! status: ${response.status}`);
  }

  return response.json();
}

// Auth API
export const authApi = {
  login: (email: string, password: string) =>
    apiCall<{ token: string; user: any }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),

  register: (username: string, email: string, password: string, role: string) =>
    apiCall<{ token: string; user: any }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ username, email, password, role }),
    }),
};

// Dashboard API
export const dashboardApi = {
  getStats: () => apiCall<any>('/dashboard/stats'),
};

// Vehicles API
export const vehiclesApi = {
  getAll: () => apiCall<any[]>('/vehicles'),
  getById: (id: string) => apiCall<any>(`/vehicles/${id}`),
  getAvailable: () => apiCall<any[]>('/vehicles/available'),
  getByDriver: (driverId: string) => apiCall<any[]>(`/vehicles/driver/${driverId}`),
  create: (data: any) =>
    apiCall<any>('/vehicles', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  update: (id: string, data: any) =>
    apiCall<any>(`/vehicles/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
  delete: (id: string) =>
    apiCall<void>(`/vehicles/${id}`, {
      method: 'DELETE',
    }),
};

// Bookings API
export const bookingsApi = {
  getAll: () => apiCall<any[]>('/bookings'),
  getByCustomer: (customerId: string) => apiCall<any[]>(`/bookings/customer/${customerId}`),
  getByDriver: (driverId: string) => apiCall<any[]>(`/bookings/driver/${driverId}`),
  create: (data: any) =>
    apiCall<any>('/bookings', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  assign: (id: string, vehicleId: string, driverId: string) =>
    apiCall<any>(`/bookings/${id}/assign`, {
      method: 'PUT',
      body: JSON.stringify({ vehicleId, driverId }),
    }),
  updateStatus: (id: string, status: string) =>
    apiCall<any>(`/bookings/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    }),
};

// Telemetry API
export const telemetryApi = {
  getLive: (city?: string) => apiCall<any[]>(`/telemetry/live${city ? `?city=${city}` : ''}`),
  getByVehicle: (vehicleId: string) => apiCall<any[]>(`/telemetry/vehicle/${vehicleId}`),
};

// AI Metrics API
export const aiApi = {
  getMetrics: () => apiCall<any>('/ai/metrics'),
  getTropical: () => apiCall<any>('/ai/tropical'),
};

// Emergency API
export const emergencyApi = {
  getAlerts: () => apiCall<any[]>('/emergency/alerts'),
  getActiveAlerts: () => apiCall<any[]>('/emergency/alerts/active'),
  getRoutes: () => apiCall<any[]>('/emergency/routes'),
};

// Maintenance API
export const maintenanceApi = {
  getAll: () => apiCall<any[]>('/maintenance'),
  getByVehicle: (vehicleId: string) => apiCall<any[]>(`/maintenance/vehicle/${vehicleId}`),
  getPredict: () => apiCall<any>('/maintenance/predict'),
};

// System API
export const systemApi = {
  getHealth: () => apiCall<any>('/system/health'),
  getTrafficAnalysis: () => apiCall<any>('/system/traffic/analysis'),
};
