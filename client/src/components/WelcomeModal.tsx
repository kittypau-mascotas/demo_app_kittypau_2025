
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "./ui/dialog";
import { Button } from "./ui/button";

interface WelcomeModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export function WelcomeModal({ isOpen, onOpenChange }: WelcomeModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <div className="mx-auto mb-4">
            <img src="/kitty-logo.jpg" alt="KittyPau Logo" className="w-24 h-24 object-contain" data-testid="img-logo" />
          </div>
          <DialogTitle className="text-center text-2xl">
            ¡Bienvenido a la Demo de KittyPau!
          </DialogTitle>
          <DialogDescription className="text-center">
            Inicia sesión con la cuenta de demostración para explorar la aplicación.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={() => onOpenChange(false)} className="w-full">
            Entendido
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
