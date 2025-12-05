import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { chartData } from '@/data/mockData';
import { Fuel, Heart, Zap, TrendingUp } from 'lucide-react';

const VehiclePerformance: React.FC = () => {
  const metrics = [
    { label: 'Engine Health', value: 94, icon: Heart, color: 'success' },
    { label: 'Fuel Efficiency', value: 87, icon: Fuel, color: 'primary' },
    { label: 'Mileage Avg', value: 14.5, icon: TrendingUp, color: 'secondary', suffix: 'km/l' },
    { label: 'Usage Trend', value: '+12%', icon: Zap, color: 'warning' },
  ];

  return (
    <div className="glass-panel p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-orbitron text-lg font-semibold">Vehicle Performance</h3>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className="pulse-dot" />
          <span>Real-time analytics</span>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {metrics.map((metric, index) => (
          <div
            key={metric.label}
            className="p-3 rounded-lg bg-muted/30 border border-border/50 animate-fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-center gap-2 mb-2">
              <metric.icon className={`w-4 h-4 text-${metric.color}`} />
              <span className="text-xs text-muted-foreground">{metric.label}</span>
            </div>
            <p className="font-orbitron text-xl font-bold">
              {metric.value}
              {metric.suffix && <span className="text-sm text-muted-foreground ml-1">{metric.suffix}</span>}
              {!metric.suffix && typeof metric.value === 'number' && <span className="text-sm text-muted-foreground">%</span>}
            </p>
          </div>
        ))}
      </div>

      {/* Performance Chart */}
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData.fleetPerformance}>
            <defs>
              <linearGradient id="colorEfficiency" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(180, 100%, 50%)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(180, 100%, 50%)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorHealth" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(150, 80%, 45%)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(150, 80%, 45%)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorFuel" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(270, 80%, 60%)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(270, 80%, 60%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
            <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} />
            <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
              }}
              labelStyle={{ color: 'hsl(var(--foreground))' }}
            />
            <Area
              type="monotone"
              dataKey="efficiency"
              stroke="hsl(180, 100%, 50%)"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorEfficiency)"
              name="Efficiency"
            />
            <Area
              type="monotone"
              dataKey="health"
              stroke="hsl(150, 80%, 45%)"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorHealth)"
              name="Health"
            />
            <Area
              type="monotone"
              dataKey="fuel"
              stroke="hsl(270, 80%, 60%)"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorFuel)"
              name="Fuel Level"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-6 mt-4">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-primary" />
          <span className="text-sm text-muted-foreground">Efficiency</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-success" />
          <span className="text-sm text-muted-foreground">Health</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-secondary" />
          <span className="text-sm text-muted-foreground">Fuel</span>
        </div>
      </div>
    </div>
  );
};

export default VehiclePerformance;
