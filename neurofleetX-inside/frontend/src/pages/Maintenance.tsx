import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { mockMaintenanceRecords, mockVehicles } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { 
  Wrench, 
  AlertTriangle, 
  Calendar, 
  CheckCircle, 
  Clock,
  TrendingUp,
  Fuel,
  Heart,
  Disc,
  Gauge
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Maintenance: React.FC = () => {
  const predictiveData = [
    { component: 'Brakes', current: 72, predicted: 45, daysLeft: 30 },
    { component: 'Engine Oil', current: 85, predicted: 55, daysLeft: 45 },
    { component: 'Tires', current: 68, predicted: 40, daysLeft: 25 },
    { component: 'Battery', current: 90, predicted: 75, daysLeft: 60 },
  ];

  const healthTrend = [
    { month: 'Jan', health: 92 },
    { month: 'Feb', health: 89 },
    { month: 'Mar', health: 91 },
    { month: 'Apr', health: 87 },
    { month: 'May', health: 93 },
    { month: 'Jun', health: 95 },
  ];

  const getHealthColor = (health: number) => {
    if (health >= 70) return 'text-success';
    if (health >= 50) return 'text-warning';
    return 'text-destructive';
  };

  return (
    <DashboardLayout title="Predictive Maintenance">
      {/* Alert Banner */}
      {mockMaintenanceRecords.filter(m => m.status === 'pending').length > 0 && (
        <div className="glass-panel p-4 mb-6 border-warning/50 bg-warning/10">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-6 h-6 text-warning" />
            <div>
              <p className="font-semibold text-warning">Predictive Maintenance Alerts</p>
              <p className="text-sm text-muted-foreground">
                {mockMaintenanceRecords.filter(m => m.status === 'pending').length} vehicles require attention based on AI analysis
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Pending', value: mockMaintenanceRecords.filter(m => m.status === 'pending').length, icon: Clock, color: 'warning' },
          { label: 'In Progress', value: mockMaintenanceRecords.filter(m => m.status === 'in_progress').length, icon: Wrench, color: 'primary' },
          { label: 'Completed', value: mockMaintenanceRecords.filter(m => m.status === 'completed').length, icon: CheckCircle, color: 'success' },
          { label: 'Avg Fleet Health', value: '94%', icon: Heart, color: 'success' },
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Predictive Analysis */}
        <div className="glass-panel p-6">
          <h3 className="font-orbitron text-lg font-semibold mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            Predictive Component Analysis
          </h3>
          <div className="space-y-4">
            {predictiveData.map((item, index) => (
              <div 
                key={item.component}
                className="p-4 rounded-lg bg-muted/30 border border-border/50 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold">{item.component}</span>
                  <span className={`text-sm ${getHealthColor(item.current)}`}>
                    Current: {item.current}%
                  </span>
                </div>
                <div className="relative h-2 rounded-full bg-muted overflow-hidden mb-2">
                  <div 
                    className={`absolute h-full rounded-full ${
                      item.current >= 70 ? 'bg-success' : item.current >= 50 ? 'bg-warning' : 'bg-destructive'
                    }`}
                    style={{ width: `${item.current}%` }}
                  />
                  <div 
                    className="absolute h-full w-1 bg-destructive/50"
                    style={{ left: `${item.predicted}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Predicted in 30 days: {item.predicted}%</span>
                  <span className={item.daysLeft < 30 ? 'text-warning' : 'text-muted-foreground'}>
                    Service in {item.daysLeft} days
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Fleet Health Trend */}
        <div className="glass-panel p-6">
          <h3 className="font-orbitron text-lg font-semibold mb-4 flex items-center gap-2">
            <Heart className="w-5 h-5 text-success" />
            Fleet Health Trend
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={healthTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} domain={[80, 100]} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="health" 
                  stroke="hsl(150, 80%, 45%)" 
                  strokeWidth={3}
                  dot={{ fill: 'hsl(150, 80%, 45%)', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Maintenance Records */}
      <div className="glass-panel p-6">
        <h3 className="font-orbitron text-lg font-semibold mb-4">Maintenance Schedule</h3>
        <div className="overflow-x-auto">
          <table className="table-neon">
            <thead>
              <tr>
                <th>ID</th>
                <th>Vehicle</th>
                <th>Type</th>
                <th>Description</th>
                <th>Status</th>
                <th>Est. Cost</th>
                <th>Scheduled</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockMaintenanceRecords.map((record, index) => (
                <tr 
                  key={record.id}
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <td>
                    <span className="font-mono font-semibold">{record.id}</span>
                  </td>
                  <td>{record.vehicleId}</td>
                  <td>
                    <span className={`status-badge ${
                      record.type === 'predictive' ? 'status-info' :
                      record.type === 'emergency' ? 'status-danger' : 'status-active'
                    }`}>
                      {record.type}
                    </span>
                  </td>
                  <td>
                    <div>
                      <p className="truncate max-w-[200px]">{record.description}</p>
                      {record.predictedIssue && (
                        <p className="text-xs text-warning mt-1">{record.predictedIssue}</p>
                      )}
                    </div>
                  </td>
                  <td>
                    <span className={`status-badge ${
                      record.status === 'completed' ? 'status-active' :
                      record.status === 'in_progress' ? 'status-info' : 'status-warning'
                    }`}>
                      {record.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td>
                    <span className="font-semibold">₹{record.estimatedCost.toLocaleString()}</span>
                  </td>
                  <td>
                    <span className="text-sm">
                      {new Date(record.scheduledDate).toLocaleDateString()}
                    </span>
                  </td>
                  <td>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Maintenance;
