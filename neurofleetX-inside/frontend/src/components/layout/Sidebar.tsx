import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import {
  LayoutDashboard,
  Car,
  Calendar,
  AlertTriangle,
  Brain,
  Activity,
  Settings,
  LogOut,
  Truck,
  MapPin,
  Wrench,
  Users,
  BarChart3,
} from 'lucide-react';

const Sidebar: React.FC = () => {
  const { user, logout } = useAuth();

  const adminLinks = [
    { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/fleet', icon: Truck, label: 'Fleet Management' },
    { to: '/bookings', icon: Calendar, label: 'Bookings' },
    { to: '/live-map', icon: MapPin, label: 'Live Map' },
    { to: '/maintenance', icon: Wrench, label: 'Maintenance' },
    { to: '/ai-control', icon: Brain, label: 'AI Control Center' },
    { to: '/emergency', icon: AlertTriangle, label: 'Emergency' },
    { to: '/analytics', icon: BarChart3, label: 'Analytics' },
    { to: '/system-health', icon: Activity, label: 'System Health' },
  ];

  const driverLinks = [
    { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/my-vehicle', icon: Car, label: 'My Vehicle' },
    { to: '/my-bookings', icon: Calendar, label: 'My Trips' },
    { to: '/live-map', icon: MapPin, label: 'Navigation' },
  ];

  const customerLinks = [
    { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/book-ride', icon: Calendar, label: 'Book a Ride' },
    { to: '/my-bookings', icon: Car, label: 'My Bookings' },
  ];

  const getNavLinks = () => {
    switch (user?.role) {
      case 'admin':
        return adminLinks;
      case 'driver':
        return driverLinks;
      case 'customer':
      case 'passenger':
        return customerLinks;
      default:
        return [];
    }
  };

  const navLinks = getNavLinks();

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-sidebar border-r border-sidebar-border flex flex-col z-50">
      {/* Logo */}
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
            <Truck className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="font-orbitron text-lg font-bold gradient-text">NeuroFleetX</h1>
            <p className="text-xs text-muted-foreground">Smart Fleet AI</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto scrollbar-thin">
        {navLinks.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `sidebar-item ${isActive ? 'active' : ''}`
            }
          >
            <Icon className="w-5 h-5" />
            <span className="font-medium">{label}</span>
          </NavLink>
        ))}
      </nav>

      {/* User Section */}
      <div className="p-4 border-t border-sidebar-border">
        <div className="glass-panel p-3 mb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center border border-primary/30">
              <Users className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold truncate">{user?.username}</p>
              <p className="text-xs text-muted-foreground capitalize">{user?.role}</p>
            </div>
          </div>
        </div>

        <button
          onClick={logout}
          className="sidebar-item w-full text-destructive hover:text-destructive hover:bg-destructive/10"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
