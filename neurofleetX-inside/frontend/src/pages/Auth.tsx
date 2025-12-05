import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { UserRole } from '@/types';
import { Truck, Eye, EyeOff, Mail, Lock, User, Shield } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const Auth: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // Form fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  const [role, setRole] = useState<UserRole>('customer');

  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!isLogin && password !== confirmPassword) {
      toast({
        title: 'Error',
        description: 'Passwords do not match',
        variant: 'destructive',
      });
      setIsLoading(false);
      return;
    }

    try {
      const result = isLogin 
        ? await login(email, password)
        : await register(username, email, password, role);

      if (result.success) {
        toast({
          title: 'Success',
          description: isLogin ? 'Welcome back!' : 'Account created successfully!',
        });
        navigate('/dashboard');
      } else {
        toast({
          title: 'Error',
          description: result.error || 'Something went wrong',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'An unexpected error occurred',
        variant: 'destructive',
      });
    }

    setIsLoading(false);
  };

  const roles: { value: UserRole; label: string; description: string }[] = [
    { value: 'admin', label: 'Admin', description: 'Full system access' },
    { value: 'driver', label: 'Driver', description: 'Vehicle & trips management' },
    { value: 'customer', label: 'Customer', description: 'Book rides & track trips' },
    { value: 'passenger', label: 'Passenger', description: 'View & rate trips' },
  ];

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-secondary/20" />
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: 'linear-gradient(hsl(var(--border) / 0.3) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--border) / 0.3) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
        
        {/* Floating elements */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-primary/20 blur-3xl animate-float" />
        <div className="absolute bottom-1/3 right-1/4 w-48 h-48 rounded-full bg-secondary/20 blur-3xl animate-float animation-delay-400" />

        <div className="relative z-10 flex flex-col items-center justify-center w-full p-12">
          <div className="mb-8 animate-fade-in">
            <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-6 mx-auto animate-pulse-glow">
              <Truck className="w-14 h-14 text-primary-foreground" />
            </div>
            <h1 className="font-orbitron text-5xl font-bold gradient-text text-center mb-4">
              NeuroFleetX
            </h1>
            <p className="text-xl text-muted-foreground text-center max-w-md">
              AI-Powered Smart Fleet Management System
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 w-full max-w-md mt-8">
            {[
              { label: 'Real-time Tracking', value: '100+' },
              { label: 'AI Optimization', value: '94.7%' },
              { label: 'Active Vehicles', value: '250+' },
              { label: 'Response Time', value: '4.2 min' },
            ].map((stat, index) => (
              <div 
                key={stat.label}
                className="glass-panel p-4 text-center animate-fade-in"
                style={{ animationDelay: `${(index + 1) * 200}ms` }}
              >
                <p className="font-orbitron text-2xl font-bold text-primary">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel - Auth Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-12">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mx-auto mb-4">
              <Truck className="w-10 h-10 text-primary-foreground" />
            </div>
            <h1 className="font-orbitron text-2xl font-bold gradient-text">NeuroFleetX</h1>
          </div>

          <div className="glass-panel p-8">
            <div className="text-center mb-8">
              <h2 className="font-orbitron text-2xl font-bold mb-2">
                {isLogin ? 'Welcome Back' : 'Create Account'}
              </h2>
              <p className="text-muted-foreground">
                {isLogin ? 'Sign in to access your dashboard' : 'Register to get started'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {!isLogin && (
                <div className="space-y-2">
                  <label className="text-sm font-medium">Username</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="input-neon pl-11"
                      placeholder="Enter username"
                      required={!isLogin}
                    />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input-neon pl-11"
                    placeholder="Enter email"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input-neon pl-11 pr-11"
                    placeholder="Enter password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {!isLogin && (
                <>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Confirm Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="input-neon pl-11"
                        placeholder="Confirm password"
                        required={!isLogin}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center gap-2">
                      <Shield className="w-4 h-4" />
                      Select Role
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {roles.map(({ value, label, description }) => (
                        <button
                          key={value}
                          type="button"
                          onClick={() => setRole(value)}
                          className={`p-3 rounded-lg border text-left transition-all ${
                            role === value 
                              ? 'border-primary bg-primary/10 text-primary' 
                              : 'border-border bg-muted/30 hover:border-primary/50'
                          }`}
                        >
                          <p className="font-semibold text-sm">{label}</p>
                          <p className="text-xs text-muted-foreground">{description}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}

              <Button
                type="submit"
                variant="neon"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? 'Please wait...' : (isLogin ? 'Sign In' : 'Create Account')}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-muted-foreground">
                {isLogin ? "Don't have an account?" : 'Already have an account?'}
                <button
                  type="button"
                  onClick={() => setIsLogin(!isLogin)}
                  className="ml-2 text-primary hover:underline font-semibold"
                >
                  {isLogin ? 'Register' : 'Sign In'}
                </button>
              </p>
            </div>

            {/* Demo Credentials */}
            {isLogin && (
              <div className="mt-6 p-4 rounded-lg bg-muted/30 border border-border/50">
                <p className="text-xs text-muted-foreground mb-2 font-semibold">Demo Credentials:</p>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <p className="text-primary">Admin:</p>
                    <p className="text-muted-foreground">admin@neurofleetx.com</p>
                  </div>
                  <div>
                    <p className="text-primary">Driver:</p>
                    <p className="text-muted-foreground">driver@neurofleetx.com</p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-2">Password: [role]123 (e.g., admin123)</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
