import React from 'react';
import { Bell, Search, Sun, Moon, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NavbarProps {
  title: string;
}

const Navbar: React.FC<NavbarProps> = ({ title }) => {
  const [showSearch, setShowSearch] = React.useState(false);

  return (
    <header className="h-16 border-b border-border bg-background/80 backdrop-blur-xl sticky top-0 z-40 px-6 flex items-center justify-between">
      {/* Left Section */}
      <div className="flex items-center gap-4">
        <h1 className="font-orbitron text-xl font-semibold">{title}</h1>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-3">
        {/* Search */}
        <div className={`relative transition-all duration-300 ${showSearch ? 'w-64' : 'w-10'}`}>
          {showSearch ? (
            <input
              type="text"
              placeholder="Search..."
              className="input-neon w-full pr-10"
              autoFocus
              onBlur={() => setShowSearch(false)}
            />
          ) : null}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowSearch(!showSearch)}
            className={showSearch ? 'absolute right-1 top-1/2 -translate-y-1/2' : ''}
          >
            <Search className="w-5 h-5" />
          </Button>
        </div>

        {/* Notifications */}
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-destructive rounded-full animate-pulse" />
        </Button>

        {/* Live Status */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-success/10 border border-success/30">
          <span className="pulse-dot" />
          <span className="text-xs font-semibold text-success uppercase tracking-wider">Live</span>
        </div>

        {/* Time */}
        <div className="hidden lg:block text-right">
          <p className="text-sm font-orbitron text-foreground">
            {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
          </p>
          <p className="text-xs text-muted-foreground">
            {new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
          </p>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
