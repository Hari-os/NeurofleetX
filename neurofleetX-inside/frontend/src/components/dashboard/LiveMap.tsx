import React, { useState, useEffect } from 'react';
import { MapPin, Navigation, Zap, RefreshCw } from 'lucide-react';
import { mockVehicles } from '@/data/mockData';
import { Vehicle } from '@/types';

interface LiveMapProps {
  compact?: boolean;
}

const LiveMap: React.FC<LiveMapProps> = ({ compact = false }) => {
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [vehicles, setVehicles] = useState(mockVehicles);

  // Simulate live updates
  useEffect(() => {
    const interval = setInterval(() => {
      setVehicles(prev => prev.map(v => ({
        ...v,
        location: {
          ...v.location,
          lat: v.location.lat + (Math.random() - 0.5) * 0.001,
          lng: v.location.lng + (Math.random() - 0.5) * 0.001,
        },
        lastUpdate: new Date(),
      })));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const activeVehicles = vehicles.filter(v => v.status === 'active');

  const getStatusColor = (status: Vehicle['status']) => {
    switch (status) {
      case 'active': return 'bg-success';
      case 'maintenance': return 'bg-warning';
      case 'available': return 'bg-primary';
      case 'offline': return 'bg-destructive';
    }
  };

  return (
    <div className={`glass-panel overflow-hidden ${compact ? 'h-80' : 'h-[500px]'}`}>
      {/* Map Header */}
      <div className="absolute top-4 left-4 right-4 z-10 flex items-center justify-between">
        <div className="glass-panel px-4 py-2 flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="pulse-dot" />
            <span className="text-sm font-semibold">{activeVehicles.length} Active</span>
          </div>
          <div className="w-px h-4 bg-border" />
          <span className="text-sm text-muted-foreground">Hyderabad Fleet</span>
        </div>
        
        <button className="glass-panel p-2 hover:bg-primary/10 transition-colors">
          <RefreshCw className="w-4 h-4 text-primary" />
        </button>
      </div>

      {/* Simulated Map Background */}
      <div className="relative w-full h-full bg-gradient-to-br from-muted to-background">
        {/* Grid overlay */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'linear-gradient(hsl(var(--border) / 0.5) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--border) / 0.5) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />

        {/* City outline simulation */}
        <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path
            d="M20,80 Q30,60 50,55 T80,40"
            stroke="hsl(var(--primary))"
            strokeWidth="0.3"
            fill="none"
          />
          <path
            d="M10,50 Q40,30 60,45 T90,30"
            stroke="hsl(var(--secondary))"
            strokeWidth="0.2"
            fill="none"
          />
        </svg>

        {/* Vehicle markers */}
        {vehicles.slice(0, compact ? 10 : 25).map((vehicle, index) => {
          const x = ((vehicle.location.lng - 78.3) / 0.4) * 100;
          const y = ((17.55 - vehicle.location.lat) / 0.3) * 100;
          
          return (
            <div
              key={vehicle.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
              style={{ 
                left: `${Math.min(Math.max(x, 10), 90)}%`, 
                top: `${Math.min(Math.max(y, 15), 85)}%`,
                animationDelay: `${index * 100}ms`,
              }}
              onClick={() => setSelectedVehicle(vehicle)}
            >
              <div className={`w-3 h-3 rounded-full ${getStatusColor(vehicle.status)} shadow-lg group-hover:scale-150 transition-transform`}>
                <div className={`absolute inset-0 rounded-full ${getStatusColor(vehicle.status)} animate-ping opacity-50`} />
              </div>
              
              {/* Tooltip on hover */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                <div className="glass-panel px-2 py-1 text-xs whitespace-nowrap">
                  <p className="font-semibold">{vehicle.id}</p>
                  <p className="text-muted-foreground">{vehicle.model}</p>
                </div>
              </div>
            </div>
          );
        })}

        {/* Selected vehicle info */}
        {selectedVehicle && (
          <div className="absolute bottom-4 left-4 right-4 z-10">
            <div className="glass-panel p-4 animate-slide-in-right">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg ${getStatusColor(selectedVehicle.status)}/20 flex items-center justify-center`}>
                    <Navigation className={`w-5 h-5 ${selectedVehicle.status === 'active' ? 'text-success' : 'text-muted-foreground'}`} />
                  </div>
                  <div>
                    <p className="font-semibold">{selectedVehicle.id} - {selectedVehicle.model}</p>
                    <p className="text-sm text-muted-foreground">{selectedVehicle.location.address}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Fuel</p>
                    <p className="font-semibold text-primary">{selectedVehicle.fuel}%</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Health</p>
                    <p className="font-semibold text-success">{selectedVehicle.health}%</p>
                  </div>
                  <button 
                    onClick={() => setSelectedVehicle(null)}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    ✕
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Map Legend */}
      <div className="absolute bottom-4 right-4 z-10">
        <div className="glass-panel px-3 py-2 flex items-center gap-3 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-success" />
            <span>Active</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-warning" />
            <span>Service</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-primary" />
            <span>Available</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveMap;
