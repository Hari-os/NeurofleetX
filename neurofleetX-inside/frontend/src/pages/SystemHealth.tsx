import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { mockSystemHealth } from '@/data/mockData';
import { 
  Activity, 
  Server, 
  Cpu, 
  HardDrive, 
  Network, 
  Clock, 
  Zap,
  Database,
  Shield,
  RefreshCw
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const SystemHealth: React.FC = () => {
  const cpuHistory = [
    { time: '00:00', value: 35 },
    { time: '04:00', value: 28 },
    { time: '08:00', value: 55 },
    { time: '12:00', value: 48 },
    { time: '16:00', value: 62 },
    { time: '20:00', value: 42 },
    { time: 'Now', value: mockSystemHealth.cpuUsage },
  ];

  const memoryHistory = [
    { time: '00:00', value: 58 },
    { time: '04:00', value: 52 },
    { time: '08:00', value: 68 },
    { time: '12:00', value: 72 },
    { time: '16:00', value: 75 },
    { time: '20:00', value: 65 },
    { time: 'Now', value: mockSystemHealth.memoryUsage },
  ];

  const services = [
    { name: 'API Gateway', status: 'operational', latency: 23, uptime: 99.99 },
    { name: 'Database Cluster', status: 'operational', latency: 12, uptime: 99.97 },
    { name: 'Auth Service', status: 'operational', latency: 18, uptime: 99.98 },
    { name: 'Telemetry Service', status: 'operational', latency: 45, uptime: 99.95 },
    { name: 'AI Engine', status: 'operational', latency: 89, uptime: 99.92 },
    { name: 'Notification Service', status: 'degraded', latency: 156, uptime: 99.85 },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational': return 'text-success';
      case 'degraded': return 'text-warning';
      case 'down': return 'text-destructive';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <DashboardLayout title="System Health">
      {/* Overall Status Banner */}
      <div className="glass-panel p-6 mb-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-success/10 via-transparent to-primary/10" />
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-success/20">
              <Activity className="w-8 h-8 text-success" />
            </div>
            <div>
              <h2 className="font-orbitron text-2xl font-bold">All Systems Operational</h2>
              <p className="text-muted-foreground">Last checked: {new Date().toLocaleTimeString()}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm text-muted-foreground">System Uptime</p>
              <p className="font-orbitron text-3xl font-bold text-success">{mockSystemHealth.uptime}%</p>
            </div>
            <button className="p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
              <RefreshCw className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { 
            label: 'Response Time', 
            value: `${mockSystemHealth.responseTime}ms`, 
            icon: Clock, 
            color: 'primary',
            status: mockSystemHealth.responseTime < 50 ? 'Fast' : 'Normal'
          },
          { 
            label: 'Data Processing', 
            value: `${(mockSystemHealth.dataProcessingSpeed / 1000).toFixed(1)}k/s`, 
            icon: Zap, 
            color: 'success',
            status: 'Active'
          },
          { 
            label: 'Network Status', 
            value: mockSystemHealth.networkStatus, 
            icon: Network, 
            color: mockSystemHealth.networkStatus === 'optimal' ? 'success' : 'warning',
            status: mockSystemHealth.networkStatus
          },
          { 
            label: 'Throughput', 
            value: `${mockSystemHealth.processingThroughput}%`, 
            icon: Activity, 
            color: 'secondary',
            status: mockSystemHealth.processingThroughput > 95 ? 'Optimal' : 'Good'
          },
        ].map((metric, index) => (
          <div 
            key={metric.label}
            className="glass-panel p-4 animate-fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className={`w-10 h-10 rounded-lg bg-${metric.color}/10 flex items-center justify-center mb-3`}>
              <metric.icon className={`w-5 h-5 text-${metric.color}`} />
            </div>
            <p className="text-sm text-muted-foreground">{metric.label}</p>
            <p className="font-orbitron text-2xl font-bold capitalize">{metric.value}</p>
            <p className={`text-xs mt-1 capitalize ${getStatusColor(metric.status.toLowerCase())}`}>
              {metric.status}
            </p>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* CPU Usage Chart */}
        <div className="glass-panel p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Cpu className="w-5 h-5 text-primary" />
              <h3 className="font-orbitron text-lg font-semibold">CPU Usage</h3>
            </div>
            <span className="font-orbitron text-2xl font-bold text-primary">{mockSystemHealth.cpuUsage}%</span>
          </div>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={cpuHistory}>
                <defs>
                  <linearGradient id="colorCpu" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(180, 100%, 50%)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(180, 100%, 50%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" fontSize={10} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={10} domain={[0, 100]} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="hsl(180, 100%, 50%)" 
                  strokeWidth={2}
                  fill="url(#colorCpu)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Memory Usage Chart */}
        <div className="glass-panel p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <HardDrive className="w-5 h-5 text-secondary" />
              <h3 className="font-orbitron text-lg font-semibold">Memory Usage</h3>
            </div>
            <span className="font-orbitron text-2xl font-bold text-secondary">{mockSystemHealth.memoryUsage}%</span>
          </div>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={memoryHistory}>
                <defs>
                  <linearGradient id="colorMemory" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(270, 80%, 60%)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(270, 80%, 60%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" fontSize={10} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={10} domain={[0, 100]} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="hsl(270, 80%, 60%)" 
                  strokeWidth={2}
                  fill="url(#colorMemory)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Services Status */}
      <div className="glass-panel p-6">
        <h3 className="font-orbitron text-lg font-semibold mb-4 flex items-center gap-2">
          <Server className="w-5 h-5" />
          Service Status
        </h3>
        <div className="space-y-3">
          {services.map((service, index) => (
            <div 
              key={service.name}
              className="p-4 rounded-lg bg-muted/30 border border-border/50 flex items-center justify-between animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center gap-4">
                <div className={`w-3 h-3 rounded-full ${
                  service.status === 'operational' ? 'bg-success' : 
                  service.status === 'degraded' ? 'bg-warning animate-pulse' : 'bg-destructive'
                }`} />
                <div>
                  <p className="font-semibold">{service.name}</p>
                  <p className={`text-sm capitalize ${getStatusColor(service.status)}`}>{service.status}</p>
                </div>
              </div>
              <div className="flex items-center gap-8 text-sm">
                <div className="text-right">
                  <p className="text-muted-foreground">Latency</p>
                  <p className={`font-semibold ${service.latency < 50 ? 'text-success' : service.latency < 100 ? 'text-warning' : 'text-destructive'}`}>
                    {service.latency}ms
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-muted-foreground">Uptime</p>
                  <p className="font-semibold text-success">{service.uptime}%</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Infrastructure Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        {[
          { label: 'Database Connections', value: '847 / 1000', icon: Database, usage: 84.7 },
          { label: 'Active Sessions', value: '2,341', icon: Shield, usage: 72 },
          { label: 'API Requests/min', value: '15,847', icon: Zap, usage: 63 },
        ].map((item, index) => (
          <div 
            key={item.label}
            className="glass-panel p-4 animate-fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-center gap-3 mb-3">
              <item.icon className="w-5 h-5 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">{item.label}</span>
            </div>
            <p className="font-orbitron text-xl font-bold mb-2">{item.value}</p>
            <div className="h-2 rounded-full bg-muted overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-primary to-secondary transition-all"
                style={{ width: `${item.usage}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default SystemHealth;
