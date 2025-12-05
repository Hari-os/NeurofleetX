import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import LiveMap from '@/components/dashboard/LiveMap';
import { mockVehicles, mockTelemetryData } from '@/data/mockData';
import { MapPin, Navigation, Fuel, Heart, Clock, Zap } from 'lucide-react';

const LiveMapPage: React.FC = () => {
  const activeVehicles = mockVehicles.filter(v => v.status === 'active');

  return (
    <DashboardLayout title="Live Fleet Map">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Map Section */}
        <div className="lg:col-span-3">
          <LiveMap />
        </div>

        {/* Live Stats Sidebar */}
        <div className="space-y-4">
          {/* Quick Stats */}
          <div className="glass-panel p-4">
            <h3 className="font-orbitron text-sm font-semibold mb-4 text-muted-foreground">LIVE STATS</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="pulse-dot" />
                  <span className="text-sm">Active Vehicles</span>
                </div>
                <span className="font-orbitron font-bold text-success">{activeVehicles.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Navigation className="w-4 h-4 text-primary" />
                  <span className="text-sm">In Transit</span>
                </div>
                <span className="font-orbitron font-bold">{Math.floor(activeVehicles.length * 0.6)}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-warning" />
                  <span className="text-sm">Idle</span>
                </div>
                <span className="font-orbitron font-bold">{Math.floor(activeVehicles.length * 0.4)}</span>
              </div>
            </div>
          </div>

          {/* Telemetry Feed */}
          <div className="glass-panel p-4">
            <h3 className="font-orbitron text-sm font-semibold mb-4 text-muted-foreground">TELEMETRY FEED</h3>
            <div className="space-y-3 max-h-80 overflow-y-auto scrollbar-thin">
              {mockTelemetryData.slice(0, 6).map((telemetry, index) => (
                <div 
                  key={telemetry.vehicleId}
                  className="p-3 rounded-lg bg-muted/30 border border-border/50 animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-sm font-semibold">{telemetry.vehicleId}</span>
                    <span className="text-xs text-muted-foreground">
                      {new Date(telemetry.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="flex items-center gap-1">
                      <Zap className="w-3 h-3 text-primary" />
                      <span>{telemetry.speed} km/h</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Fuel className="w-3 h-3 text-warning" />
                      <span>{telemetry.fuel}%</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Heart className="w-3 h-3 text-success" />
                      <span>{telemetry.engineHealth}%</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-secondary" />
                      <span className="truncate">{telemetry.location.lat.toFixed(3)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Fleet Overview */}
          <div className="glass-panel p-4">
            <h3 className="font-orbitron text-sm font-semibold mb-4 text-muted-foreground">FLEET OVERVIEW</h3>
            <div className="space-y-2">
              {[
                { label: 'Avg Speed', value: '42 km/h', color: 'primary' },
                { label: 'Avg Fuel', value: '68%', color: 'success' },
                { label: 'Fleet Health', value: '94%', color: 'success' },
                { label: 'Coverage Area', value: '847 km²', color: 'secondary' },
              ].map(item => (
                <div key={item.label} className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{item.label}</span>
                  <span className={`font-orbitron font-semibold text-${item.color}`}>{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default LiveMapPage;
