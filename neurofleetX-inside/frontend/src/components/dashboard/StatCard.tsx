import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'destructive';
  suffix?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon: Icon,
  trend,
  color = 'primary',
  suffix,
}) => {
  const colorClasses = {
    primary: 'from-primary/20 to-primary/5 text-primary border-primary/30',
    secondary: 'from-secondary/20 to-secondary/5 text-secondary border-secondary/30',
    success: 'from-success/20 to-success/5 text-success border-success/30',
    warning: 'from-warning/20 to-warning/5 text-warning border-warning/30',
    destructive: 'from-destructive/20 to-destructive/5 text-destructive border-destructive/30',
  };

  const iconBgClasses = {
    primary: 'bg-primary/10 text-primary',
    secondary: 'bg-secondary/10 text-secondary',
    success: 'bg-success/10 text-success',
    warning: 'bg-warning/10 text-warning',
    destructive: 'bg-destructive/10 text-destructive',
  };

  return (
    <div className="stat-card group animate-fade-in">
      <div className={`absolute inset-0 bg-gradient-to-br ${colorClasses[color]} opacity-50 rounded-xl`} />
      
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div className={`p-3 rounded-lg ${iconBgClasses[color]} transition-transform group-hover:scale-110`}>
            <Icon className="w-6 h-6" />
          </div>
          {trend && (
            <div className={`flex items-center gap-1 text-sm font-semibold ${trend.isPositive ? 'text-success' : 'text-destructive'}`}>
              <span>{trend.isPositive ? '↑' : '↓'}</span>
              <span>{Math.abs(trend.value)}%</span>
            </div>
          )}
        </div>

        <div className="space-y-1">
          <p className="text-sm text-muted-foreground uppercase tracking-wider">{title}</p>
          <p className="metric-value text-foreground">
            {value}
            {suffix && <span className="text-lg text-muted-foreground ml-1">{suffix}</span>}
          </p>
        </div>
      </div>
    </div>
  );
};

export default StatCard;
