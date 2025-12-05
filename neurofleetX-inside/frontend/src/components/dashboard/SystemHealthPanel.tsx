import React from 'react';
import { mockSystemHealth } from '@/data/mockData';
import { Activity, Clock, Cpu, Network, Server, Zap } from 'lucide-react';

const SystemHealthPanel: React.FC = () => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'optimal': return 'text-success';
      case 'degraded': return 'text-warning';
      case 'critical': return 'text-destructive';
      default: return 'text-muted-foreground';
    }
  };

  const metrics = [
    {
      label: 'System Uptime',
      value: `${mockSystemHealth.uptime}%`,
      icon: Server,
      status: mockSystemHealth.uptime > 99 ? 'Excellent' : 'Good',
    },
    {
      label: 'Response Time',
      value: `${mockSystemHealth.responseTime}ms`,
      icon: Clock,
      status: mockSystemHealth.responseTime < 50 ? 'Fast' : 'Normal',
    },
    {
      label: 'Data Processing',
      value: `${(mockSystemHealth.dataProcessingSpeed / 1000).toFixed(1)}k/s`,
      icon: Zap,
      status: 'Active',
    },
    {
      label: 'Network Status',
      value: mockSystemHealth.networkStatus,
      icon: Network,
      status: mockSystemHealth.networkStatus,
    },
    {
      label: 'CPU Usage',
      value: `${mockSystemHealth.cpuUsage}%`,
      icon: Cpu,
      status: mockSystemHealth.cpuUsage < 60 ? 'Normal' : 'High',
    },
    {
      label: 'Throughput',
      value: `${mockSystemHealth.processingThroughput}%`,
      icon: Activity,
      status: mockSystemHealth.processingThroughput > 95 ? 'Optimal' : 'Good',
    },
  ];

  return (
    <div className="glass-panel p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-success/10">
            <Activity className="w-5 h-5 text-success" />
          </div>
          <div>
            <h3 className="font-orbitron text-lg font-semibold">System Health</h3>
            <p className="text-xs text-muted-foreground">Infrastructure monitoring</p>
          </div>
        </div>
        <div className={`status-badge ${mockSystemHealth.networkStatus === 'optimal' ? 'status-active' : 'status-warning'}`}>
          <span className="pulse-dot" />
          <span className="capitalize">{mockSystemHealth.networkStatus}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {metrics.map((metric, index) => (
          <div
            key={metric.label}
            className="p-4 rounded-lg bg-muted/30 border border-border/50 animate-fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-center gap-2 mb-3">
              <metric.icon className="w-4 h-4 text-muted-foreground" />
              <span className="text-xs text-muted-foreground uppercase tracking-wider">{metric.label}</span>
            </div>
            <p className="font-orbitron text-xl font-bold mb-1 capitalize">{metric.value}</p>
            <p className={`text-xs ${getStatusColor(metric.status.toLowerCase())}`}>{metric.status}</p>
          </div>
        ))}
      </div>

      {/* Progress Bars */}
      <div className="mt-6 space-y-4">
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-muted-foreground">CPU Usage</span>
            <span className="font-semibold">{mockSystemHealth.cpuUsage}%</span>
          </div>
          <div className="h-2 rounded-full bg-muted overflow-hidden">
            <div 
              className="h-full rounded-full bg-gradient-to-r from-primary to-secondary transition-all duration-500"
              style={{ width: `${mockSystemHealth.cpuUsage}%` }}
            />
          </div>
        </div>
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-muted-foreground">Memory Usage</span>
            <span className="font-semibold">{mockSystemHealth.memoryUsage}%</span>
          </div>
          <div className="h-2 rounded-full bg-muted overflow-hidden">
            <div 
              className="h-full rounded-full bg-gradient-to-r from-success to-primary transition-all duration-500"
              style={{ width: `${mockSystemHealth.memoryUsage}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemHealthPanel;
