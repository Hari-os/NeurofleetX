import React from 'react';
import { mockAIMetrics } from '@/data/mockData';
import { Brain, Zap, Clock, TrendingDown, Signal, Activity } from 'lucide-react';

const AIMetricsPanel: React.FC = () => {
  const metrics = [
    {
      label: 'Fleet Optimization Score',
      value: mockAIMetrics.fleetOptimizationScore,
      icon: Brain,
      color: 'primary',
      suffix: '%',
    },
    {
      label: 'Traffic Flow Efficiency',
      value: mockAIMetrics.trafficFlowEfficiency,
      icon: Activity,
      color: 'success',
      suffix: '%',
    },
    {
      label: 'Signal Timing Optimization',
      value: mockAIMetrics.signalTimingOptimization,
      icon: Signal,
      color: 'secondary',
      suffix: '%',
    },
    {
      label: 'Congestion Reduction',
      value: mockAIMetrics.congestionReduction,
      icon: TrendingDown,
      color: 'warning',
      suffix: '%',
    },
    {
      label: 'Emergency Response Time',
      value: mockAIMetrics.emergencyResponseTime,
      icon: Clock,
      color: 'destructive',
      suffix: ' min',
    },
  ];

  const colorClasses: Record<string, string> = {
    primary: 'text-primary bg-primary/10 border-primary/30',
    success: 'text-success bg-success/10 border-success/30',
    secondary: 'text-secondary bg-secondary/10 border-secondary/30',
    warning: 'text-warning bg-warning/10 border-warning/30',
    destructive: 'text-destructive bg-destructive/10 border-destructive/30',
  };

  return (
    <div className="glass-panel p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <Brain className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-orbitron text-lg font-semibold">AI Metrics</h3>
            <p className="text-xs text-muted-foreground">Real-time AI optimization status</p>
          </div>
        </div>
        <div className={`status-badge ${mockAIMetrics.tropicalOptimization.status === 'active' ? 'status-active' : 'status-warning'}`}>
          <Zap className="w-3 h-3" />
          <span>AI {mockAIMetrics.tropicalOptimization.status}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {metrics.map((metric, index) => (
          <div
            key={metric.label}
            className={`p-4 rounded-lg border ${colorClasses[metric.color]} animate-fade-in`}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-center gap-2 mb-2">
              <metric.icon className="w-4 h-4" />
              <span className="text-xs uppercase tracking-wider opacity-80">{metric.label}</span>
            </div>
            <p className="font-orbitron text-2xl font-bold">
              {metric.value}
              <span className="text-sm font-normal opacity-70">{metric.suffix}</span>
            </p>
          </div>
        ))}
      </div>

      {/* Tropical Optimization Status */}
      <div className="mt-6 p-4 rounded-lg bg-muted/30 border border-border/50">
        <h4 className="font-semibold mb-3 flex items-center gap-2">
          <Zap className="w-4 h-4 text-primary" />
          Tropical Optimization
        </h4>
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div className="flex items-center justify-between p-2 rounded bg-background/50">
            <span className="text-muted-foreground">Pattern Recognition</span>
            <span className={mockAIMetrics.tropicalOptimization.patternRecognition ? 'text-success' : 'text-destructive'}>
              {mockAIMetrics.tropicalOptimization.patternRecognition ? 'Active' : 'Inactive'}
            </span>
          </div>
          <div className="flex items-center justify-between p-2 rounded bg-background/50">
            <span className="text-muted-foreground">Route Optimization</span>
            <span className="text-primary font-semibold">{mockAIMetrics.tropicalOptimization.routeOptimization}%</span>
          </div>
          <div className="flex items-center justify-between p-2 rounded bg-background/50">
            <span className="text-muted-foreground">Prediction Analysis</span>
            <span className={mockAIMetrics.tropicalOptimization.predictionAnalysis ? 'text-success' : 'text-destructive'}>
              {mockAIMetrics.tropicalOptimization.predictionAnalysis ? 'Active' : 'Inactive'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIMetricsPanel;
