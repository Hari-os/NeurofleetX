import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import StatCard from '@/components/dashboard/StatCard';
import LiveMap from '@/components/dashboard/LiveMap';
import VehiclePerformance from '@/components/dashboard/VehiclePerformance';
import BookingsTable from '@/components/dashboard/BookingsTable';
import AIMetricsPanel from '@/components/dashboard/AIMetricsPanel';
import SystemHealthPanel from '@/components/dashboard/SystemHealthPanel';
import { mockDashboardStats } from '@/data/mockData';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Truck, 
  Activity, 
  Wrench, 
  WifiOff, 
  Calendar, 
  IndianRupee, 
  Fuel, 
  Heart 
} from 'lucide-react';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  const stats = [
    {
      title: 'Total Vehicles',
      value: mockDashboardStats.totalVehicles,
      icon: Truck,
      color: 'primary' as const,
      trend: { value: 8, isPositive: true },
    },
    {
      title: 'Active Vehicles',
      value: mockDashboardStats.activeVehicles,
      icon: Activity,
      color: 'success' as const,
      trend: { value: 12, isPositive: true },
    },
    {
      title: 'In Service',
      value: mockDashboardStats.inServiceVehicles,
      icon: Wrench,
      color: 'warning' as const,
    },
    {
      title: 'Offline',
      value: mockDashboardStats.offlineVehicles,
      icon: WifiOff,
      color: 'destructive' as const,
    },
    {
      title: 'Current Bookings',
      value: mockDashboardStats.currentBookings,
      icon: Calendar,
      color: 'secondary' as const,
      trend: { value: 5, isPositive: true },
    },
    {
      title: "Today's Revenue",
      value: `₹${mockDashboardStats.todayRevenue.toLocaleString()}`,
      icon: IndianRupee,
      color: 'success' as const,
      trend: { value: 18, isPositive: true },
    },
    {
      title: 'Fuel Efficiency',
      value: mockDashboardStats.fuelEfficiency,
      icon: Fuel,
      color: 'primary' as const,
      suffix: 'km/l',
    },
    {
      title: 'Avg Vehicle Health',
      value: mockDashboardStats.avgVehicleHealth,
      icon: Heart,
      color: 'success' as const,
      suffix: '%',
    },
  ];

  return (
    <DashboardLayout title="Dashboard">
      {/* Welcome Banner */}
      <div className="glass-panel p-6 mb-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-secondary/10" />
        <div className="relative z-10">
          <h1 className="font-orbitron text-2xl font-bold mb-2">
            Welcome back, <span className="gradient-text">{user?.username}</span>
          </h1>
          <p className="text-muted-foreground">
            Here's an overview of your fleet performance for today.
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, index) => (
          <StatCard
            key={stat.title}
            {...stat}
          />
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Live Map */}
        <div className="lg:col-span-1">
          <h3 className="font-orbitron text-lg font-semibold mb-4">Live Fleet Map</h3>
          <LiveMap compact />
        </div>

        {/* Vehicle Performance */}
        <div className="lg:col-span-1">
          <VehiclePerformance />
        </div>
      </div>

      {/* Bookings Table */}
      <div className="mb-6">
        <BookingsTable limit={5} />
      </div>

      {/* AI & System Health */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AIMetricsPanel />
        <SystemHealthPanel />
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
