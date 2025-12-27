import { Button } from '@/components/ui/button';
import { Menu, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useLocation } from 'wouter';
import logo from '@assets/generated_images/KittyPau_app_logo_icon_4a2bd296.png';

interface HeaderProps {
  onMenuToggle: () => void;
}

export default function Header({ onMenuToggle }: HeaderProps) {
  const { logout, user } = useAuth();
  const [, setLocation] = useLocation();

  const handleLogout = () => {
    logout();
    setLocation('/login');
  };

  return (
    <header className="navbar px-6 py-4 lg:px-8 border-b">
      <div className="flex items-center justify-between w-full max-w-screen-2xl mx-auto">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={onMenuToggle}
            data-testid="button-menu-toggle"
          >
            <Menu className="h-6 w-6" />
          </Button>
          <img 
            src="/kitty-logo.jpg" 
            alt="KittyPau Logo" 
            className="w-16 h-16 object-contain"
          />
          <h1 className="titulo text-2xl lg:text-3xl">KittyPau</h1>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-card border border-card-border">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="text-sm font-medium text-primary">
                {user?.username?.charAt(0).toUpperCase()}
              </span>
            </div>
            <span className="text-sm font-medium text-foreground">
              {user?.username}
            </span>
          </div>
          <Button variant="outline" size="sm" onClick={handleLogout} className="hover-elevate">
            Cerrar Sesión
          </Button>
        </div>
      </div>
    </header>
  );
}