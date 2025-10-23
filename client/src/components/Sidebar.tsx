import { Link, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import {
  Home,
  Wifi,
  PawPrint,
  LineChart,
  Bell,
  Settings,
  CreditCard,
  Users,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils';

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
  { icon: CreditCard, label: 'Planes', href: '/planes' },
  { icon: Users, label: 'Usuarios', href: '/users' },
  { icon: Settings, label: 'Configuración', href: '/settings' },
];

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const [location] = useLocation();

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
          data-testid="sidebar-overlay"
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed lg:static inset-y-0 left-0 z-50 w-64 bg-sidebar border-r border-sidebar-border transform transition-transform duration-200 ease-in-out lg:translate-x-0',
          isOpen ? 'translate-x-0' : '-translate-x-full',
        )}
        data-testid="sidebar"
      >
        <div className="flex items-center justify-between p-4 border-b border-sidebar-border lg:hidden">
          <h2 className="text-lg font-bold">Menú</h2>
          <Button variant="ghost" size="icon" onClick={onClose} data-testid="button-sidebar-close">
            <X className="h-5 w-5" />
          </Button>
        </div>

        <nav className="p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location === item.href;

            return (
              <Link key={item.href} href={item.href}>
                <Button
                  variant={isActive ? 'secondary' : 'ghost'}
                  className="w-full justify-start nav-item"
                  onClick={onClose}
                  data-testid={`link-${item.label.toLowerCase()}`}
                >
                  <Icon className="h-5 w-5 mr-3" />
                  {item.label}
                </Button>
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}