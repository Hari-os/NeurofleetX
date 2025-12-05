import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { mockAIMetrics, mockTrafficAnalysis } from '@/data/mockData';
import { 
  Brain, 
  Zap, 
  TrendingUp, 
  Activity, 
  Signal, 
  Clock, 
  Map,
  Cpu,
  Network,
  Eye,
  Target,
  Gauge
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

const AIControlCenter: React.FC = () => {
  const optimizationData = [
    { subject: 'Fleet Opt', A: mockAIMetrics.fleetOptimizationScore, fullMark: 100 },
    { subject: 'Traffic Flow', A: mockAIMetrics.trafficFlowEfficiency, fullMark: 100 },
    { subject: 'Signal Timing', A: mockAIMetrics.signalTimingOptimization, fullMark: 100 },
    { subject: 'Congestion', A: 100 - mockAIMetrics.congestionReduction, fullMark: 100 },
    { subject: 'Response', A: 100 - (mockAIMetrics.emergencyResponseTime * 10), fullMark: 100 },
  ];

  const timeSeriesData = [
    { time: '00:00', optimization: 88, traffic: 75, efficiency: 82 },
    { time: '04:00', optimization: 85, traffic: 78, efficiency: 79 },
    { time: '08:00', optimization: 92, traffic: 65, efficiency: 85 },
    { time: '12:00', optimization: 89, traffic: 70, efficiency: 83 },
    { time: '16:00', optimization: 95, traffic: 58, efficiency: 91 },
    { time: '20:00', optimization: 91, traffic: 72, efficiency: 87 },
  ];

  const aiModels = [
    { name: 'Tropical Pattern Recognition', status: 'active', accuracy: 96.4, icon: Eye },
    { name: 'Emergency Route Optimization', status: 'active', accuracy: 78, icon: Target },
    { name: 'Prediction Analysis Engine', status: 'active', accuracy: 91.2, icon: Brain },
    { name: 'Traffic Flow Controller', status: 'learning', accuracy: 87.5, icon: Network },
    { name: 'Fleet Distribution AI', status: 'active', accuracy: 94.1, icon: Map },
    { name: 'Demand Forecasting', status: 'active', accuracy: 89.8, icon: TrendingUp },
  ];

  return (
    <DashboardLayout title="AI Control Center">
      {/* Hero Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        {[
          { label: 'Fleet Optimization', value: `${mockAIMetrics.fleetOptimizationScore}%`, icon: Brain, color: 'primary' },
          { label: 'Traffic Efficiency', value: `${mockAIMetrics.trafficFlowEfficiency}%`, icon: Activity, color: 'success' },
          { label: 'Signal Optimization', value: `${mockAIMetrics.signalTimingOptimization}%`, icon: Signal, color: 'secondary' },
          { label: 'Congestion Reduced', value: `${mockAIMetrics.congestionReduction}%`, icon: TrendingUp, color: 'warning' },
          { label: 'Response Time', value: `${mockAIMetrics.emergencyResponseTime} min`, icon: Clock, color: 'destructive' },
        ].map((stat, index) => (
          <div 
            key={stat.label}
            className="glass-panel p-4 animate-fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className={`w-10 h-10 rounded-lg bg-${stat.color}/10 flex items-center justify-center mb-3`}>
              <stat.icon className={`w-5 h-5 text-${stat.color}`} />
            </div>
            <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
            <p className="font-orbitron text-2xl font-bold">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Tropical Optimization Status */}
      <div className="glass-panel p-6 mb-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20">
              <Zap className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-orbitron text-xl font-bold">Tropical Optimization</h3>
              <p className="text-sm text-muted-foreground">Advanced AI optimization system for tropical traffic patterns</p>
            </div>
          </div>
          <div className={`status-badge ${mockAIMetrics.tropicalOptimization.status === 'active' ? 'status-active' : 'status-warning'}`}>
            <span className="pulse-dot" />
            <span className="uppercase">{mockAIMetrics.tropicalOptimization.status}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 rounded-lg bg-muted/30 border border-border/50">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-muted-foreground">Pattern Recognition</span>
              <span className={`font-semibold ${mockAIMetrics.tropicalOptimization.patternRecognition ? 'text-success' : 'text-destructive'}`}>
                {mockAIMetrics.tropicalOptimization.patternRecognition ? 'Active' : 'Inactive'}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Eye className="w-5 h-5 text-primary" />
              <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
                <div className="h-full bg-gradient-to-r from-primary to-success w-full animate-shimmer" 
                  style={{ backgroundSize: '200% 100%' }}
                />
              </div>
            </div>
          </div>

          <div className="p-4 rounded-lg bg-muted/30 border border-border/50">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-muted-foreground">Route Optimization</span>
              <span className="font-semibold text-primary">{mockAIMetrics.tropicalOptimization.routeOptimization}% accuracy</span>
            </div>
            <div className="flex items-center gap-2">
              <Target className="w-5 h-5 text-secondary" />
              <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-secondary to-primary transition-all"
                  style={{ width: `${mockAIMetrics.tropicalOptimization.routeOptimization}%` }}
                />
              </div>
            </div>
          </div>

          <div className="p-4 rounded-lg bg-muted/30 border border-border/50">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-muted-foreground">Prediction Analysis</span>
              <span className={`font-semibold ${mockAIMetrics.tropicalOptimization.predictionAnalysis ? 'text-success' : 'text-destructive'}`}>
                {mockAIMetrics.tropicalOptimization.predictionAnalysis ? 'Active' : 'Inactive'}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Brain className="w-5 h-5 text-success" />
              <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
                <div className="h-full bg-gradient-to-r from-success to-primary w-full animate-shimmer"
                  style={{ backgroundSize: '200% 100%' }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Radar Chart */}
        <div className="glass-panel p-6">
          <h3 className="font-orbitron text-lg font-semibold mb-4">AI Performance Matrix</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={optimizationData}>
                <PolarGrid stroke="hsl(var(--border))" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: 'hsl(var(--muted-foreground))' }} />
                <Radar
                  name="Performance"
                  dataKey="A"
                  stroke="hsl(180, 100%, 50%)"
                  fill="hsl(180, 100%, 50%)"
                  fillOpacity={0.3}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Time Series */}
        <div className="glass-panel p-6">
          <h3 className="font-orbitron text-lg font-semibold mb-4">Real-time AI Metrics</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={timeSeriesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                />
                <Line type="monotone" dataKey="optimization" stroke="hsl(180, 100%, 50%)" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="traffic" stroke="hsl(150, 80%, 45%)" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="efficiency" stroke="hsl(270, 80%, 60%)" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* AI Models Grid */}
      <div className="glass-panel p-6">
        <h3 className="font-orbitron text-lg font-semibold mb-4">Active AI Models</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {aiModels.map((model, index) => (
            <div 
              key={model.name}
              className="p-4 rounded-lg bg-muted/30 border border-border/50 hover:border-primary/50 transition-all animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <model.icon className="w-5 h-5 text-primary" />
                </div>
                <span className={`status-badge ${model.status === 'active' ? 'status-active' : 'status-info'}`}>
                  {model.status}
                </span>
              </div>
              <h4 className="font-semibold mb-2">{model.name}</h4>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Accuracy</span>
                <span className="font-orbitron text-lg font-bold text-primary">{model.accuracy}%</span>
              </div>
              <div className="mt-2 h-1.5 rounded-full bg-muted overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-primary to-success transition-all"
                  style={{ width: `${model.accuracy}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Traffic Analysis */}
      <div className="glass-panel p-6 mt-6">
        <h3 className="font-orbitron text-lg font-semibold mb-4">Traffic Analysis Model</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-lg bg-muted/30">
            <p className="text-sm text-muted-foreground mb-1">Peak Type</p>
            <p className="font-semibold capitalize">{mockTrafficAnalysis.peakType} Rush</p>
          </div>
          <div className="p-4 rounded-lg bg-muted/30">
            <p className="text-sm text-muted-foreground mb-1">Avg Travel Time</p>
            <p className="font-semibold">{mockTrafficAnalysis.avgTravelTime} min</p>
          </div>
          <div className="p-4 rounded-lg bg-muted/30">
            <p className="text-sm text-muted-foreground mb-1">Base Speed</p>
            <p className="font-semibold">{mockTrafficAnalysis.baseSpeed} km/h</p>
          </div>
          <div className="p-4 rounded-lg bg-muted/30">
            <p className="text-sm text-muted-foreground mb-1">Optimized Routes</p>
            <p className="font-semibold text-primary">{mockTrafficAnalysis.optimizedRoutes}</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AIControlCenter;
