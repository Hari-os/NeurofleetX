import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import FleetManagement from "./pages/FleetManagement";
import AIControlCenter from "./pages/AIControlCenter";
import EmergencyManagement from "./pages/EmergencyManagement";
import SystemHealth from "./pages/SystemHealth";
import LiveMapPage from "./pages/LiveMapPage";
import Bookings from "./pages/Bookings";
import Maintenance from "./pages/Maintenance";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  return <>{children}</>;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/auth" element={<Auth />} />
      
      {/* Protected Routes */}
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/fleet" element={<ProtectedRoute><FleetManagement /></ProtectedRoute>} />
      <Route path="/bookings" element={<ProtectedRoute><Bookings /></ProtectedRoute>} />
      <Route path="/live-map" element={<ProtectedRoute><LiveMapPage /></ProtectedRoute>} />
      <Route path="/maintenance" element={<ProtectedRoute><Maintenance /></ProtectedRoute>} />
      <Route path="/ai-control" element={<ProtectedRoute><AIControlCenter /></ProtectedRoute>} />
      <Route path="/emergency" element={<ProtectedRoute><EmergencyManagement /></ProtectedRoute>} />
      <Route path="/system-health" element={<ProtectedRoute><SystemHealth /></ProtectedRoute>} />
      <Route path="/analytics" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      
      {/* Driver/Customer specific routes */}
      <Route path="/my-vehicle" element={<ProtectedRoute><FleetManagement /></ProtectedRoute>} />
      <Route path="/my-bookings" element={<ProtectedRoute><Bookings /></ProtectedRoute>} />
      <Route path="/book-ride" element={<ProtectedRoute><Bookings /></ProtectedRoute>} />
      
      {/* Catch-all */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
