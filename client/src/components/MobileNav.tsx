import { Link, useLocation } from 'wouter';
import { Home, Wifi, PawPrint, Bell } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { icon: Home, label: 'Inicio', href: '/dashboard' },
  { icon: Wifi, label: 'Dispositivos', href: '/devices' },
  { icon: PawPrint, label: 'Mascotas', href: '/mascotas' },
  { icon: Bell, label: 'Alertas', href: '/alerts' },
];

export default function MobileNav() {
  const [location] = useLocation();

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50 shadow-xl">
      <div className="flex justify-around items-center py-3 px-2 max-w-screen-sm mx-auto">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href}>
            <a
              className={cn(
                'flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-all min-w-[60px]',
                location === item.href
                  ? 'text-primary bg-primary/10'
                  : 'text-muted-foreground hover-elevate'
              )}
              data-testid={`mobile-link-${item.label.toLowerCase()}`}
            >
              <item.icon className="w-6 h-6" />
              <span className="text-xs font-medium">{item.label}</span>
            </a>
          </Link>
        ))}
      </div>
    </nav>
  );
}