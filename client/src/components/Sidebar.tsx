import { Link, useLocation } from 'wouter';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Home,
  Wifi,
  PawPrint,
  LineChart,
  Bell,
  Settings,
  X,
  LogOut
} from 'lucide-react';
import { useSession, useSignOut } from '@/lib/auth-client';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  { icon: Home, label: 'Dashboard', href: '/dashboard' },
  { icon: Wifi, label: 'Dispositivos', href: '/devices' },
  { icon: PawPrint, label: 'Mascotas', href: '/mascotas' },
  { icon: LineChart, label: 'Analíticas', href: '/analytics' },
  { icon: Bell, label: 'Alertas', href: '/alerts' },
  { icon: Settings, label: 'Configuración', href: '/settings' },
];

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const [location] = useLocation();
  const { data: session } = useSession();
  const { mutate: signOut } = useSignOut();

  const handleLogout = () => {
    signOut();
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
          data-testid="sidebar-overlay"
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed lg:static inset-y-0 left-0 z-50 w-64 bg-card border-r border-border transform transition-transform duration-200 ease-in-out lg:translate-x-0 flex flex-col',
          isOpen ? 'translate-x-0' : '-translate-x-full',
        )}
        data-testid="sidebar"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border h-16">
          <div className="flex items-center gap-2">
            <div className="bg-primary/10 p-1.5 rounded-full">
              <img src="/graficas/kitty-logo.svg" alt="KittyPaw" className="w-8 h-8" />
            </div>
            <span className="text-xl font-bold text-foreground font-display">
              KittyPaw
            </span>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="lg:hidden" data-testid="button-sidebar-close">
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center w-full p-3 rounded-lg text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                )}
                onClick={() => { if (window.innerWidth < 1024) onClose(); }}
                data-testid={`link-${item.label.toLowerCase()}`}
              >
                <Icon className="h-5 w-5 mr-3" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* User Profile & Logout */}
        <div className="p-4 border-t border-border">
          {session?.user && (
              <div className="flex items-center gap-3 mb-4 px-2 cursor-pointer hover:bg-accent rounded-lg p-2 transition-colors">                
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold shrink-0">
                  {session.user.name?.charAt(0).toUpperCase() || 'U'}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">
                    {session.user.name}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    {session.user.email}
                  </p>
                </div>
              </div>

          )}
          
          <Button 
            variant="outline" 
            className="w-full justify-start text-muted-foreground hover:text-destructive hover:bg-destructive/10 hover:border-destructive/20"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4 mr-2" />
            Cerrar Sesión
          </Button>
        </div>
      </aside>
    </>
  );
}