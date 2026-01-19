import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import NotificationBell from './NotificationBell';

interface NavbarProps {
  title: string;
  showLogout?: boolean;
}

export default function Navbar({ title, showLogout = true }: NavbarProps) {
  const [, setLocation] = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('userId');
    setLocation('/login');
  };

  return (
    <div className="flex items-center justify-between mb-8">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">{title}</h1>
      <div className="flex items-center gap-2">
      <NotificationBell />
      {showLogout && (
        <Button variant="outline" onClick={handleLogout} className="gap-2">
          <LogOut className="h-4 w-4" />
          <span className="hidden sm:inline">Cerrar sesión</span>
        </Button>
      )}
      </div>
    </div>
  );
}