import React, { useState } from 'react';
import { mockBookings, mockVehicles } from '@/data/mockData';
import { Booking } from '@/types';
import { Button } from '@/components/ui/button';
import { Check, X, Car, Clock, MapPin, User } from 'lucide-react';

interface BookingsTableProps {
  limit?: number;
  showActions?: boolean;
}

const BookingsTable: React.FC<BookingsTableProps> = ({ limit, showActions = true }) => {
  const [bookings, setBookings] = useState(mockBookings);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  const displayBookings = limit ? bookings.slice(0, limit) : bookings;
  const availableVehicles = mockVehicles.filter(v => v.status === 'available');

  const getStatusBadge = (status: Booking['status']) => {
    const styles = {
      pending: 'status-badge status-warning',
      assigned: 'status-badge status-info',
      in_progress: 'status-badge status-active',
      completed: 'status-badge bg-muted/50 text-muted-foreground border-muted',
      cancelled: 'status-badge status-danger',
    };
    return styles[status];
  };

  const handleAssign = (bookingId: string, vehicleId: string) => {
    setBookings(prev => prev.map(b => 
      b.id === bookingId 
        ? { ...b, status: 'assigned' as const, vehicleId, driverId: `DR-${vehicleId.split('-')[1]}` }
        : b
    ));
    setSelectedBooking(null);
  };

  const handleComplete = (bookingId: string) => {
    setBookings(prev => prev.map(b => 
      b.id === bookingId 
        ? { ...b, status: 'completed' as const, completedTime: new Date(), fare: Math.floor(Math.random() * 500) + 200 }
        : b
    ));
  };

  const handleCancel = (bookingId: string) => {
    setBookings(prev => prev.map(b => 
      b.id === bookingId ? { ...b, status: 'cancelled' as const } : b
    ));
  };

  return (
    <div className="glass-panel overflow-hidden">
      <div className="p-4 border-b border-border">
        <h3 className="font-orbitron text-lg font-semibold">Recent Bookings</h3>
      </div>

      <div className="overflow-x-auto">
        <table className="table-neon">
          <thead>
            <tr>
              <th>Booking ID</th>
              <th>Customer</th>
              <th>Pickup</th>
              <th>Destination</th>
              <th>Status</th>
              <th>Scheduled</th>
              {showActions && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {displayBookings.map((booking, index) => (
              <tr 
                key={booking.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <td>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Car className="w-4 h-4 text-primary" />
                    </div>
                    <span className="font-mono font-semibold">{booking.id}</span>
                  </div>
                </td>
                <td>
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-muted-foreground" />
                    <span>{booking.customerName}</span>
                  </div>
                </td>
                <td>
                  <div className="flex items-center gap-1 text-sm">
                    <MapPin className="w-3 h-3 text-success" />
                    <span className="truncate max-w-[150px]">{booking.pickup.address}</span>
                  </div>
                </td>
                <td>
                  <div className="flex items-center gap-1 text-sm">
                    <MapPin className="w-3 h-3 text-destructive" />
                    <span className="truncate max-w-[150px]">{booking.destination.address}</span>
                  </div>
                </td>
                <td>
                  <span className={getStatusBadge(booking.status)}>
                    {booking.status.replace('_', ' ')}
                  </span>
                </td>
                <td>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    <span>{new Date(booking.scheduledTime).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                </td>
                {showActions && (
                  <td>
                    <div className="flex items-center gap-2">
                      {booking.status === 'pending' && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedBooking(booking)}
                        >
                          Assign
                        </Button>
                      )}
                      {booking.status === 'assigned' && (
                        <Button
                          variant="success"
                          size="sm"
                          onClick={() => handleComplete(booking.id)}
                        >
                          <Check className="w-3 h-3" />
                        </Button>
                      )}
                      {['pending', 'assigned'].includes(booking.status) && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleCancel(booking.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      )}
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Assignment Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="glass-panel w-full max-w-md p-6 animate-scale-in">
            <h3 className="font-orbitron text-lg font-semibold mb-4">Assign Vehicle</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Select a vehicle for booking <span className="text-primary font-mono">{selectedBooking.id}</span>
            </p>

            <div className="space-y-2 max-h-60 overflow-y-auto mb-4">
              {availableVehicles.length > 0 ? (
                availableVehicles.map(vehicle => (
                  <button
                    key={vehicle.id}
                    onClick={() => handleAssign(selectedBooking.id, vehicle.id)}
                    className="w-full p-3 rounded-lg bg-muted/30 hover:bg-muted/50 border border-border/50 hover:border-primary/50 transition-all text-left flex items-center justify-between"
                  >
                    <div>
                      <p className="font-semibold">{vehicle.id} - {vehicle.model}</p>
                      <p className="text-sm text-muted-foreground">{vehicle.licensePlate}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-primary">{vehicle.fuel}% fuel</p>
                      <p className="text-sm text-success">{vehicle.health}% health</p>
                    </div>
                  </button>
                ))
              ) : (
                <p className="text-center text-muted-foreground py-4">No vehicles available</p>
              )}
            </div>

            <Button
              variant="ghost"
              className="w-full"
              onClick={() => setSelectedBooking(null)}
            >
              Cancel
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingsTable;
