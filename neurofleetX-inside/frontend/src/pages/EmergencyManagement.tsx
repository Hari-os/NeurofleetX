import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { mockEmergencyAlerts } from '@/data/mockData';
import { EmergencyAlert } from '@/types';
import { Button } from '@/components/ui/button';
import { 
  AlertTriangle, 
  Ambulance, 
  Flame, 
  Shield, 
  Car,
  MapPin,
  Clock,
  Navigation,
  Phone,
  CheckCircle,
  XCircle,
  Siren
} from 'lucide-react';

const EmergencyManagement: React.FC = () => {
  const [alerts, setAlerts] = useState(mockEmergencyAlerts);
  const [selectedAlert, setSelectedAlert] = useState<EmergencyAlert | null>(null);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setAlerts(prev => prev.map(alert => ({
        ...alert,
        estimatedArrival: alert.status === 'responding' && alert.estimatedArrival && alert.estimatedArrival > 1 
          ? alert.estimatedArrival - 1 
          : alert.estimatedArrival,
      })));
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  const getAlertIcon = (type: EmergencyAlert['type']) => {
    switch (type) {
      case 'ambulance': return Ambulance;
      case 'fire_truck': return Flame;
      case 'police': return Shield;
      case 'emergency_vehicle': return Car;
    }
  };

  const getSeverityBadge = (severity: EmergencyAlert['severity']) => {
    const styles = {
      high: 'status-badge status-danger animate-pulse',
      medium: 'status-badge status-warning',
      low: 'status-badge status-info',
    };
    return styles[severity];
  };

  const getStatusBadge = (status: EmergencyAlert['status']) => {
    const styles = {
      active: 'status-badge status-danger animate-pulse',
      responding: 'status-badge status-warning',
      resolved: 'status-badge status-active',
    };
    return styles[status];
  };

  const handleResolve = (alertId: string) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === alertId ? { ...alert, status: 'resolved' as const } : alert
    ));
    setSelectedAlert(null);
  };

  const activeAlerts = alerts.filter(a => a.status !== 'resolved');
  const resolvedAlerts = alerts.filter(a => a.status === 'resolved');

  return (
    <DashboardLayout title="Emergency Management">
      {/* Alert Banner */}
      {activeAlerts.filter(a => a.severity === 'high').length > 0 && (
        <div className="glass-panel p-4 mb-6 border-destructive/50 bg-destructive/10 animate-pulse">
          <div className="flex items-center gap-3">
            <Siren className="w-6 h-6 text-destructive" />
            <div>
              <p className="font-semibold text-destructive">Active High-Priority Alerts</p>
              <p className="text-sm text-muted-foreground">
                {activeAlerts.filter(a => a.severity === 'high').length} critical emergencies requiring immediate attention
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Active Emergencies', value: activeAlerts.length, icon: AlertTriangle, color: 'destructive' },
          { label: 'Responding Units', value: alerts.filter(a => a.status === 'responding').length, icon: Navigation, color: 'warning' },
          { label: 'Resolved Today', value: resolvedAlerts.length, icon: CheckCircle, color: 'success' },
          { label: 'Avg Response Time', value: '4.2 min', icon: Clock, color: 'primary' },
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active Alerts List */}
        <div className="glass-panel p-6">
          <h3 className="font-orbitron text-lg font-semibold mb-4 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-destructive" />
            Active Emergencies
          </h3>
          
          <div className="space-y-4">
            {activeAlerts.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <CheckCircle className="w-12 h-12 mx-auto mb-3 text-success" />
                <p>No active emergencies</p>
              </div>
            ) : (
              activeAlerts.map((alert, index) => {
                const Icon = getAlertIcon(alert.type);
                return (
                  <div
                    key={alert.id}
                    className={`p-4 rounded-lg border cursor-pointer transition-all animate-fade-in ${
                      alert.severity === 'high' 
                        ? 'border-destructive/50 bg-destructive/5 hover:border-destructive' 
                        : 'border-border/50 bg-muted/30 hover:border-primary/50'
                    }`}
                    style={{ animationDelay: `${index * 100}ms` }}
                    onClick={() => setSelectedAlert(alert)}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${alert.severity === 'high' ? 'bg-destructive/20' : 'bg-warning/20'}`}>
                          <Icon className={`w-5 h-5 ${alert.severity === 'high' ? 'text-destructive' : 'text-warning'}`} />
                        </div>
                        <div>
                          <p className="font-semibold capitalize">{alert.type.replace('_', ' ')}</p>
                          <p className="text-xs text-muted-foreground">ID: {alert.id}</p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <span className={getSeverityBadge(alert.severity)}>{alert.severity}</span>
                        <span className={getStatusBadge(alert.status)}>{alert.status}</span>
                      </div>
                    </div>

                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3 h-3 text-success" />
                        <span className="text-muted-foreground">From:</span>
                        <span className="truncate">{alert.location.address}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3 h-3 text-destructive" />
                        <span className="text-muted-foreground">To:</span>
                        <span className="truncate">{alert.destination.address}</span>
                      </div>
                    </div>

                    {alert.estimatedArrival && (
                      <div className="mt-3 flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">ETA</span>
                        <span className="font-orbitron font-bold text-primary">{alert.estimatedArrival} min</span>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Emergency Map */}
        <div className="glass-panel overflow-hidden h-[500px]">
          <div className="relative w-full h-full bg-gradient-to-br from-muted to-background">
            {/* Grid overlay */}
            <div 
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: 'linear-gradient(hsl(var(--destructive) / 0.3) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--destructive) / 0.3) 1px, transparent 1px)',
                backgroundSize: '40px 40px',
              }}
            />

            {/* Title */}
            <div className="absolute top-4 left-4 right-4 z-10">
              <div className="glass-panel px-4 py-2 inline-flex items-center gap-3">
                <Siren className="w-4 h-4 text-destructive animate-pulse" />
                <span className="text-sm font-semibold">Emergency Response Map - Hyderabad</span>
              </div>
            </div>

            {/* Emergency markers */}
            {activeAlerts.map((alert, index) => {
              const Icon = getAlertIcon(alert.type);
              const x = ((alert.location.lng - 78.3) / 0.4) * 100;
              const y = ((17.55 - alert.location.lat) / 0.3) * 100;
              
              return (
                <div
                  key={alert.id}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                  style={{ 
                    left: `${Math.min(Math.max(x, 10), 90)}%`, 
                    top: `${Math.min(Math.max(y, 20), 85)}%`,
                  }}
                  onClick={() => setSelectedAlert(alert)}
                >
                  <div className={`p-2 rounded-full ${
                    alert.severity === 'high' ? 'bg-destructive' : 'bg-warning'
                  } shadow-lg group-hover:scale-125 transition-transform`}>
                    <Icon className="w-4 h-4 text-white" />
                    <div className={`absolute inset-0 rounded-full ${
                      alert.severity === 'high' ? 'bg-destructive' : 'bg-warning'
                    } animate-ping opacity-50`} />
                  </div>
                </div>
              );
            })}

            {/* Route lines visualization */}
            <svg className="absolute inset-0 w-full h-full opacity-50" viewBox="0 0 100 100" preserveAspectRatio="none">
              {activeAlerts.map((alert, i) => {
                const x1 = ((alert.location.lng - 78.3) / 0.4) * 100;
                const y1 = ((17.55 - alert.location.lat) / 0.3) * 100;
                const x2 = ((alert.destination.lng - 78.3) / 0.4) * 100;
                const y2 = ((17.55 - alert.destination.lat) / 0.3) * 100;
                return (
                  <path
                    key={alert.id}
                    d={`M ${x1} ${y1} Q ${(x1 + x2) / 2} ${Math.min(y1, y2) - 10} ${x2} ${y2}`}
                    stroke={alert.severity === 'high' ? 'hsl(var(--destructive))' : 'hsl(var(--warning))'}
                    strokeWidth="0.5"
                    strokeDasharray="2,2"
                    fill="none"
                  />
                );
              })}
            </svg>
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      {selectedAlert && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="glass-panel w-full max-w-lg p-6 animate-scale-in">
            {(() => {
              const Icon = getAlertIcon(selectedAlert.type);
              return (
                <>
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-xl ${
                        selectedAlert.severity === 'high' ? 'bg-destructive/20' : 'bg-warning/20'
                      }`}>
                        <Icon className={`w-8 h-8 ${
                          selectedAlert.severity === 'high' ? 'text-destructive' : 'text-warning'
                        }`} />
                      </div>
                      <div>
                        <h2 className="font-orbitron text-xl font-bold capitalize">
                          {selectedAlert.type.replace('_', ' ')}
                        </h2>
                        <p className="text-muted-foreground">Emergency ID: {selectedAlert.id}</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => setSelectedAlert(null)}
                      className="text-muted-foreground hover:text-foreground text-2xl"
                    >
                      ✕
                    </button>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div className="flex gap-2">
                      <span className={getSeverityBadge(selectedAlert.severity)}>{selectedAlert.severity} Priority</span>
                      <span className={getStatusBadge(selectedAlert.status)}>{selectedAlert.status}</span>
                    </div>

                    <div className="glass-panel p-4 space-y-3">
                      <div>
                        <p className="text-sm text-muted-foreground">Origin</p>
                        <p className="font-semibold">{selectedAlert.location.address}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Destination</p>
                        <p className="font-semibold">{selectedAlert.destination.address}</p>
                      </div>
                      {selectedAlert.estimatedArrival && (
                        <div className="flex items-center justify-between pt-2 border-t border-border">
                          <span className="text-muted-foreground">Estimated Arrival</span>
                          <span className="font-orbitron text-xl font-bold text-primary">
                            {selectedAlert.estimatedArrival} min
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button variant="outline" className="flex-1">
                      <Phone className="w-4 h-4 mr-2" />
                      Contact Unit
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <Navigation className="w-4 h-4 mr-2" />
                      Track Route
                    </Button>
                    {selectedAlert.status !== 'resolved' && (
                      <Button 
                        variant="success" 
                        className="flex-1"
                        onClick={() => handleResolve(selectedAlert.id)}
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Resolve
                      </Button>
                    )}
                  </div>
                </>
              );
            })()}
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default EmergencyManagement;
