import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Menu, PawPrint } from 'lucide-react'; // Add PawPrint icon
import { usePets } from '@/hooks/data/usePets'; // Import usePets to get the list of pets
import { useSession, useSignOut } from '@/lib/auth-client';
// import logo from '@assets/generated_images/KittyPau_app_logo_icon_4a2bd296.png'; // No longer needed directly here

interface HeaderProps {
  onMenuToggle: () => void;
}

export default function Header({ onMenuToggle }: HeaderProps) {
  const { data: session } = useSession();
  const { data: pets } = usePets();
  const { mutate: signOut } = useSignOut();
  const user = session?.user;

  const handleLogout = () => {
    signOut();
  };

  const displayName = user?.name || user?.email || 'Usuario';

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
                {displayName.charAt(0).toUpperCase()}
              </span>
            </div>
            <span className="text-sm font-medium text-foreground">
              {displayName}
            </span>
          </div>

          {/* Pet Selector */}
          {pets && pets.length > 0 && (
            <Select
              // La lógica para la mascota activa se reimplementará.
              // onValueChange={(petId) => setActivePet(parseInt(petId))}
              // value={session?.user?.activePetId?.toString() || (pets.length > 0 ? pets[0].id.toString() : '')}
            >
              <SelectTrigger className="w-[180px]">
                <PawPrint className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Seleccionar Mascota" />
              </SelectTrigger>
              <SelectContent>
                {pets.map(pet => (
                  <SelectItem key={pet.id} value={pet.id.toString()}>{pet.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}

          <Button variant="outline" size="sm" onClick={handleLogout} className="hover-elevate">
            Cerrar Sesión
          </Button>
        </div>
      </div>
    </header>
  );
}