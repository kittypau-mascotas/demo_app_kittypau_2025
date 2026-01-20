import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PawPrint } from "lucide-react";

export function WelcomeModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Verificar si ya se mostró el mensaje
    const hasSeenWelcome = localStorage.getItem("hasSeenWelcome");
    if (!hasSeenWelcome) {
      setIsOpen(true);
    }
  }, []);

  const handleClose = () => {
    // Guardar en localStorage para no volver a mostrar
    localStorage.setItem("hasSeenWelcome", "true");
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="mx-auto bg-primary/10 p-3 rounded-full mb-4 w-fit">
            <PawPrint className="w-8 h-8 text-primary" />
          </div>
          <DialogTitle className="text-center text-2xl font-display">
            ¡Bienvenido a KittyPau!
          </DialogTitle>
          <DialogDescription className="text-center pt-2">
            Estamos felices de tenerte aquí. KittyPau te ayuda a monitorear la salud y alimentación de tus mascotas de forma inteligente.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="bg-muted/50 p-4 rounded-lg text-sm space-y-2">
            <p>🚀 <strong>Primeros pasos:</strong></p>
            <ul className="list-disc list-inside text-muted-foreground ml-1 space-y-1">
              <li>Registra a tus mascotas en la sección "Mascotas".</li>
              <li>Vincula tus dispositivos IoT.</li>
              <li>Configura alertas personalizadas.</li>
            </ul>
          </div>
        </div>

        <DialogFooter className="sm:justify-center">
          <Button onClick={handleClose} className="w-full sm:w-auto">
            ¡Comenzar a cuidar! 🐾
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}