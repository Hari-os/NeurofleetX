import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Vehicle } from '@/types';
import { Button } from '@/components/ui/button';
import { vehiclesApi } from '@/services/api';
import { useToast } from '@/hooks/use-toast';
import { 
  Car, 
  Fuel, 
  Heart, 
  MapPin, 
  Search, 
  Plus,
  Edit,
  Trash2,
  Eye,
  Wrench,
  X,
  Loader2
} from 'lucide-react';

interface VehicleFormData {
  model: string;
  type: 'sedan' | 'suv' | 'truck' | 'van' | 'bus';
  licensePlate: string;
  locationAddress: string;
  locationLat: number;
  locationLng: number;
}

const FleetManagement: React.FC = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();
  
  const [formData, setFormData] = useState<VehicleFormData>({
    model: '',
    type: 'sedan',
    licensePlate: '',
    locationAddress: '',
    locationLat: 0,
    locationLng: 0,
  });

  // Fetch vehicles from backend
  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      setLoading(true);
      const data = await vehiclesApi.getAll();
      setVehicles(data);
    } catch (error) {
      console.error('Failed to fetch vehicles:', error);
      toast({
        title: 'Error',
        description: 'Failed to load vehicles. Using demo data.',
        variant: 'destructive',
      });
      // Fallback to mock data if backend is not available
      const { mockVehicles } = await import('@/data/mockData');
      setVehicles(mockVehicles);
    } finally {
      setLoading(false);
    }
  };

  const handleAddVehicle = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.model || !formData.licensePlate) {
      toast({
        title: 'Validation Error',
        description: 'Please fill in all required fields.',
        variant: 'destructive',
      });
      return;
    }

    setSubmitting(true);
    try {
      const newVehicle = await vehiclesApi.create({
        model: formData.model,
        type: formData.type,
        licensePlate: formData.licensePlate,
        location: {
          lat: formData.locationLat || 40.7128,
          lng: formData.locationLng || -74.0060,
          address: formData.locationAddress || 'Default Location',
        },
        status: 'available',
        fuel: 100,
        health: 100,
        mileage: 0,
      });
      
      setVehicles(prev => [...prev, newVehicle]);
      setShowAddModal(false);
      setFormData({
        model: '',
        type: 'sedan',
        licensePlate: '',
        locationAddress: '',
        locationLat: 0,
        locationLng: 0,
      });
      
      toast({
        title: 'Success',
        description: 'Vehicle added successfully!',
      });
    } catch (error) {
      console.error('Failed to add vehicle:', error);
      toast({
        title: 'Error',
        description: 'Failed to add vehicle. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteVehicle = async (id: string) => {
    if (!confirm('Are you sure you want to delete this vehicle?')) return;
    
    try {
      await vehiclesApi.delete(id);
      setVehicles(prev => prev.filter(v => v.id !== id));
      setSelectedVehicle(null);
      toast({
        title: 'Success',
        description: 'Vehicle deleted successfully!',
      });
    } catch (error) {
      console.error('Failed to delete vehicle:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete vehicle.',
        variant: 'destructive',
      });
    }
  };

  const filteredVehicles = vehicles.filter(v => {
    const matchesSearch = v.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          v.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          v.licensePlate.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || v.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: Vehicle['status']) => {
    const styles = {
      active: 'status-badge status-active',
      maintenance: 'status-badge status-warning',
      available: 'status-badge status-info',
      offline: 'status-badge status-danger',
    };
    return styles[status];
  };

  const getHealthColor = (health: number) => {
    if (health >= 80) return 'text-success';
    if (health >= 60) return 'text-warning';
    return 'text-destructive';
  };

  const getFuelColor = (fuel: number) => {
    if (fuel >= 50) return 'text-success';
    if (fuel >= 25) return 'text-warning';
    return 'text-destructive';
  };

  if (loading) {
    return (
      <DashboardLayout title="Fleet Management">
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <span className="ml-2">Loading vehicles...</span>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Fleet Management">
      {/* Header Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search vehicles..."
              className="input-neon pl-10 py-2"
            />
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="input-neon w-40 py-2"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="available">Available</option>
            <option value="maintenance">Maintenance</option>
            <option value="offline">Offline</option>
          </select>
        </div>

        <Button variant="neon" onClick={() => setShowAddModal(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Vehicle
        </Button>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Total', value: vehicles.length, color: 'primary' },
          { label: 'Active', value: vehicles.filter(v => v.status === 'active').length, color: 'success' },
          { label: 'Available', value: vehicles.filter(v => v.status === 'available').length, color: 'info' },
          { label: 'Maintenance', value: vehicles.filter(v => v.status === 'maintenance').length, color: 'warning' },
        ].map(stat => (
          <div key={stat.label} className="glass-panel p-4">
            <p className="text-sm text-muted-foreground">{stat.label}</p>
            <p className="font-orbitron text-2xl font-bold">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Vehicles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredVehicles.map((vehicle, index) => (
          <div
            key={vehicle.id}
            className="glass-panel-hover p-5 cursor-pointer animate-fade-in"
            style={{ animationDelay: `${index * 50}ms` }}
            onClick={() => setSelectedVehicle(vehicle)}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Car className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="font-semibold">{vehicle.id}</p>
                  <p className="text-sm text-muted-foreground">{vehicle.model}</p>
                </div>
              </div>
              <span className={getStatusBadge(vehicle.status)}>
                {vehicle.status}
              </span>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                <span className="truncate">{vehicle.location.address}</span>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <span className="text-muted-foreground">Plate:</span>
                <span className="font-mono">{vehicle.licensePlate}</span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-2 rounded bg-muted/30">
                  <div className="flex items-center gap-1 mb-1">
                    <Fuel className={`w-3 h-3 ${getFuelColor(vehicle.fuel)}`} />
                    <span className="text-xs text-muted-foreground">Fuel</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${vehicle.fuel >= 50 ? 'bg-success' : vehicle.fuel >= 25 ? 'bg-warning' : 'bg-destructive'}`}
                      style={{ width: `${vehicle.fuel}%` }}
                    />
                  </div>
                  <p className={`text-xs mt-1 font-semibold ${getFuelColor(vehicle.fuel)}`}>{vehicle.fuel}%</p>
                </div>

                <div className="p-2 rounded bg-muted/30">
                  <div className="flex items-center gap-1 mb-1">
                    <Heart className={`w-3 h-3 ${getHealthColor(vehicle.health)}`} />
                    <span className="text-xs text-muted-foreground">Health</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${vehicle.health >= 80 ? 'bg-success' : vehicle.health >= 60 ? 'bg-warning' : 'bg-destructive'}`}
                      style={{ width: `${vehicle.health}%` }}
                    />
                  </div>
                  <p className={`text-xs mt-1 font-semibold ${getHealthColor(vehicle.health)}`}>{vehicle.health}%</p>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t border-border/50">
                <span>Mileage: {vehicle.mileage.toLocaleString()} km</span>
                <span>Updated: {new Date(vehicle.lastUpdate).toLocaleTimeString()}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Vehicle Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="glass-panel w-full max-w-lg p-6 animate-scale-in">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-orbitron text-xl font-bold">Add New Vehicle</h2>
              <button 
                onClick={() => setShowAddModal(false)}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddVehicle} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Vehicle Model *</label>
                <input
                  type="text"
                  value={formData.model}
                  onChange={(e) => setFormData(prev => ({ ...prev, model: e.target.value }))}
                  placeholder="e.g., Tesla Model 3"
                  className="input-neon w-full py-2"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Vehicle Type *</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value as any }))}
                  className="input-neon w-full py-2"
                >
                  <option value="sedan">Sedan</option>
                  <option value="suv">SUV</option>
                  <option value="truck">Truck</option>
                  <option value="van">Van</option>
                  <option value="bus">Bus</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">License Plate *</label>
                <input
                  type="text"
                  value={formData.licensePlate}
                  onChange={(e) => setFormData(prev => ({ ...prev, licensePlate: e.target.value.toUpperCase() }))}
                  placeholder="e.g., ABC-1234"
                  className="input-neon w-full py-2"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Location Address</label>
                <input
                  type="text"
                  value={formData.locationAddress}
                  onChange={(e) => setFormData(prev => ({ ...prev, locationAddress: e.target.value }))}
                  placeholder="e.g., 123 Main Street, City"
                  className="input-neon w-full py-2"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Latitude</label>
                  <input
                    type="number"
                    step="any"
                    value={formData.locationLat || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, locationLat: parseFloat(e.target.value) || 0 }))}
                    placeholder="40.7128"
                    className="input-neon w-full py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Longitude</label>
                  <input
                    type="number"
                    step="any"
                    value={formData.locationLng || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, locationLng: parseFloat(e.target.value) || 0 }))}
                    placeholder="-74.0060"
                    className="input-neon w-full py-2"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={() => setShowAddModal(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" variant="neon" className="flex-1" disabled={submitting}>
                  {submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Adding...
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4 mr-2" />
                      Add Vehicle
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Vehicle Detail Modal */}
      {selectedVehicle && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="glass-panel w-full max-w-2xl p-6 animate-scale-in max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Car className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h2 className="font-orbitron text-2xl font-bold">{selectedVehicle.id}</h2>
                  <p className="text-muted-foreground">{selectedVehicle.model}</p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedVehicle(null)}
                className="text-muted-foreground hover:text-foreground text-2xl"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-6">
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <span className={getStatusBadge(selectedVehicle.status)}>
                    {selectedVehicle.status}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">License Plate</p>
                  <p className="font-mono font-semibold">{selectedVehicle.licensePlate}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Type</p>
                  <p className="capitalize">{selectedVehicle.type}</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Location</p>
                  <p>{selectedVehicle.location.address}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Mileage</p>
                  <p className="font-semibold">{selectedVehicle.mileage.toLocaleString()} km</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Driver ID</p>
                  <p>{selectedVehicle.driverId || 'Unassigned'}</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="glass-panel p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Fuel Level</span>
                  <span className={`font-semibold ${getFuelColor(selectedVehicle.fuel)}`}>{selectedVehicle.fuel}%</span>
                </div>
                <div className="h-3 rounded-full bg-muted overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all ${selectedVehicle.fuel >= 50 ? 'bg-success' : selectedVehicle.fuel >= 25 ? 'bg-warning' : 'bg-destructive'}`}
                    style={{ width: `${selectedVehicle.fuel}%` }}
                  />
                </div>
              </div>
              <div className="glass-panel p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Vehicle Health</span>
                  <span className={`font-semibold ${getHealthColor(selectedVehicle.health)}`}>{selectedVehicle.health}%</span>
                </div>
                <div className="h-3 rounded-full bg-muted overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all ${selectedVehicle.health >= 80 ? 'bg-success' : selectedVehicle.health >= 60 ? 'bg-warning' : 'bg-destructive'}`}
                    style={{ width: `${selectedVehicle.health}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" className="flex-1">
                <Eye className="w-4 h-4 mr-2" />
                Track Vehicle
              </Button>
              <Button variant="outline" className="flex-1">
                <Edit className="w-4 h-4 mr-2" />
                Edit Details
              </Button>
              <Button 
                variant="destructive" 
                className="flex-1"
                onClick={() => handleDeleteVehicle(selectedVehicle.id)}
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default FleetManagement;