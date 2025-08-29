import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Settings, Globe, BarChart3, Download, User, Key } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

const Header = () => {
  const location = useLocation();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 bg-scraper-bg-primary border-b border-scraper-border z-50">
      <div className="flex items-center justify-between px-6 h-14">
        {/* Logo and Title */}
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-lg bg-scraper-accent-primary flex items-center justify-center">
            <Globe className="w-5 h-5 text-white" />
          </div>
          <h1 className="ml-3 text-scraper-text-primary font-semibold text-lg">
            WebScraper AI
          </h1>
        </div>

        {/* Navigation */}
        <nav className="flex items-center space-x-6">
          {/* Navigation Links */}
          <a
            href="/dashboard"
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
              isActive('/dashboard')
                ? 'bg-scraper-accent-primary text-white'
                : 'text-scraper-text-secondary hover:text-scraper-text-primary hover:bg-scraper-bg-card'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span className="text-sm font-medium">Dashboard</span>
          </a>

          <a
            href="/metrics"
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
              isActive('/metrics')
                ? 'bg-scraper-accent-primary text-white'
                : 'text-scraper-text-secondary hover:text-scraper-text-primary hover:bg-scraper-bg-card'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span className="text-sm font-medium">Metrics</span>
          </a>

          {/* Settings Dropdown */}
          <DropdownMenu open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="p-2 text-scraper-text-secondary hover:text-scraper-text-primary hover:bg-scraper-bg-card"
              >
                <Settings className="w-5 h-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem className="flex items-center space-x-2">
                <Download className="w-4 h-4" />
                <span>Export Chat History</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center space-x-2">
                <User className="w-4 h-4" />
                <span>Preferences</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex items-center space-x-2">
                <Key className="w-4 h-4" />
                <span>API Settings</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>
      </div>
    </header>
  );
};

export default Header;