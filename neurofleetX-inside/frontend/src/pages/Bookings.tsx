import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import BookingsTable from '@/components/dashboard/BookingsTable';
import { Button } from '@/components/ui/button';
import { bookingsApi, vehiclesApi } from '@/services/api';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { Vehicle, Booking } from '@/types';
import { 
  Calendar, 
  Clock, 
  CheckCircle, 
  XCircle, 
  Plus,
  X,
  Loader2,
  MapPin,
  Car
} from 'lucide-react';

interface BookingFormData {
  pickupAddress: string;
  pickupLat: number;
  pickupLng: number;
  destinationAddress: string;
  destinationLat: number;
  destinationLng: number;
  scheduledTime: string;
  vehicleId: string;
}

const Bookings: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [availableVehicles, setAvailableVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [showBookModal, setShowBookModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  const [formData, setFormData] = useState<BookingFormData>({
    pickupAddress: '',
    pickupLat: 0,
    pickupLng: 0,
    destinationAddress: '',
    destinationLat: 0,
    destinationLng: 0,
    scheduledTime: '',
    vehicleId: '',
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [bookingsData, vehiclesData] = await Promise.all([
        bookingsApi.getAll(),
        vehiclesApi.getAvailable(),
      ]);
      setBookings(bookingsData);
      setAvailableVehicles(vehiclesData);
    } catch (error) {
      console.error('Failed to fetch data:', error);
      toast({
        title: 'Error',
        description: 'Failed to load data. Using demo data.',
        variant: 'destructive',
      });
      // Fallback to mock data
      const { mockBookings, mockVehicles } = await import('@/data/mockData');
      setBookings(mockBookings);
      setAvailableVehicles(mockVehicles.filter(v => v.status === 'available'));
    } finally {
      setLoading(false);
    }
  };

  const handleBookVehicle = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.pickupAddress || !formData.destinationAddress || !formData.scheduledTime) {
      toast({
        title: 'Validation Error',
        description: 'Please fill in all required fields.',
        variant: 'destructive',
      });
      return;
    }

    setSubmitting(true);
    try {
      const newBooking = await bookingsApi.create({
        customerId: user?.id || 'CUST-001',
        customerName: user?.username || 'Customer',
        vehicleId: formData.vehicleId || null,
        pickup: {
          lat: formData.pickupLat || 40.7128,
          lng: formData.pickupLng || -74.0060,
          address: formData.pickupAddress,
        },
        destination: {
          lat: formData.destinationLat || 40.7589,
          lng: formData.destinationLng || -73.9851,
          address: formData.destinationAddress,
        },
        scheduledTime: new Date(formData.scheduledTime).toISOString(),
        status: formData.vehicleId ? 'assigned' : 'pending',
      });
      
      setBookings(prev => [...prev, newBooking]);
      setShowBookModal(false);
      setFormData({
        pickupAddress: '',
        pickupLat: 0,
        pickupLng: 0,
        destinationAddress: '',
        destinationLat: 0,
        destinationLng: 0,
        scheduledTime: '',
        vehicleId: '',
      });
      
      // Refresh available vehicles
      fetchData();
      
      toast({
        title: 'Success',
        description: 'Booking created successfully!',
      });
    } catch (error) {
      console.error('Failed to create booking:', error);
      toast({
        title: 'Error',
        description: 'Failed to create booking. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setSubmitting(false);
    }
  };

  const pendingBookings = bookings.filter(b => b.status === 'pending').length;
  const assignedBookings = bookings.filter(b => b.status === 'assigned').length;
  const completedBookings = bookings.filter(b => b.status === 'completed').length;
  const cancelledBookings = bookings.filter(b => b.status === 'cancelled').length;

  if (loading) {
    return (
      <DashboardLayout title="Bookings Management">
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <span className="ml-2">Loading bookings...</span>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Bookings Management">
      {/* Header with Book Vehicle Button */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-muted-foreground">
          {availableVehicles.length} vehicles available for booking
        </h2>
        <Button variant="neon" onClick={() => setShowBookModal(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Book Vehicle
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Pending', value: pendingBookings, icon: Clock, color: 'warning' },
          { label: 'Assigned', value: assignedBookings, icon: Calendar, color: 'primary' },
          { label: 'Completed', value: completedBookings, icon: CheckCircle, color: 'success' },
          { label: 'Cancelled', value: cancelledBookings, icon: XCircle, color: 'destructive' },
        ].map((stat, index) => (
          <div 
            key={stat.label}
            className="glass-panel p-4 animate-fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className={`w-10 h-10 rounded-lg bg-${stat.color}/10 flex items-center justify-center mb-3`}>
              <stat.icon className={`w-5 h-5 text-${stat.color}`} />
            </div>
            <p className="text-sm text-muted-foreground">{stat.label}</p>
            <p className="font-orbitron text-2xl font-bold">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Bookings Table */}
      <BookingsTable />

      {/* Book Vehicle Modal */}
      {showBookModal && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="glass-panel w-full max-w-lg p-6 animate-scale-in max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-orbitron text-xl font-bold">Book a Vehicle</h2>
              <button 
                onClick={() => setShowBookModal(false)}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleBookVehicle} className="space-y-4">
              {/* Select Available Vehicle */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  <Car className="w-4 h-4 inline mr-1" />
                  Select Vehicle (Optional)
                </label>
                <select
                  value={formData.vehicleId}
                  onChange={(e) => setFormData(prev => ({ ...prev, vehicleId: e.target.value }))}
                  className="input-neon w-full py-2"
                >
                  <option value="">Auto-assign (any available)</option>
                  {availableVehicles.map(vehicle => (
                    <option key={vehicle.id} value={vehicle.id}>
                      {vehicle.id} - {vehicle.model} ({vehicle.licensePlate})
                    </option>
                  ))}
                </select>
                {availableVehicles.length === 0 && (
                  <p className="text-xs text-warning mt-1">No vehicles currently available</p>
                )}
              </div>

              {/* Pickup Location */}
              <div className="space-y-2">
                <label className="block text-sm font-medium">
                  <MapPin className="w-4 h-4 inline mr-1" />
                  Pickup Location *
                </label>
                <input
                  type="text"
                  value={formData.pickupAddress}
                  onChange={(e) => setFormData(prev => ({ ...prev, pickupAddress: e.target.value }))}
                  placeholder="Enter pickup address"
                  className="input-neon w-full py-2"
                  required
                />
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="number"
                    step="any"
                    value={formData.pickupLat || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, pickupLat: parseFloat(e.target.value) || 0 }))}
                    placeholder="Latitude"
                    className="input-neon py-2 text-sm"
                  />
                  <input
                    type="number"
                    step="any"
                    value={formData.pickupLng || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, pickupLng: parseFloat(e.target.value) || 0 }))}
                    placeholder="Longitude"
                    className="input-neon py-2 text-sm"
                  />
                </div>
              </div>

              {/* Destination */}
              <div className="space-y-2">
                <label className="block text-sm font-medium">
                  <MapPin className="w-4 h-4 inline mr-1 text-success" />
                  Destination *
                </label>
                <input
                  type="text"
                  value={formData.destinationAddress}
                  onChange={(e) => setFormData(prev => ({ ...prev, destinationAddress: e.target.value }))}
                  placeholder="Enter destination address"
                  className="input-neon w-full py-2"
                  required
                />
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="number"
                    step="any"
                    value={formData.destinationLat || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, destinationLat: parseFloat(e.target.value) || 0 }))}
                    placeholder="Latitude"
                    className="input-neon py-2 text-sm"
                  />
                  <input
                    type="number"
                    step="any"
                    value={formData.destinationLng || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, destinationLng: parseFloat(e.target.value) || 0 }))}
                    placeholder="Longitude"
                    className="input-neon py-2 text-sm"
                  />
                </div>
              </div>

              {/* Scheduled Time */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  <Clock className="w-4 h-4 inline mr-1" />
                  Scheduled Time *
                </label>
                <input
                  type="datetime-local"
                  value={formData.scheduledTime}
                  onChange={(e) => setFormData(prev => ({ ...prev, scheduledTime: e.target.value }))}
                  className="input-neon w-full py-2"
                  required
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={() => setShowBookModal(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" variant="neon" className="flex-1" disabled={submitting}>
                  {submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Booking...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Confirm Booking
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default Bookings;