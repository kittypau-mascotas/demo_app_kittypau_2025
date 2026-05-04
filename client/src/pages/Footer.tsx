import { Mail } from "lucide-react";
import { Link } from "wouter";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background border-t border-primary/10 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12 items-center md:items-start text-center md:text-left">
          {/* Brand */}
          <div className="space-y-4">
            <span className="font-display text-3xl text-primary tracking-tight">KittyPau</span>
            <p className="font-sans text-base text-foreground/60 max-w-xs mx-auto md:mx-0">
              Conectando hogares con el bienestar de sus mascotas mediante tecnología inteligente.
            </p>
          </div>

          {/* Contact */}
          <div className="flex flex-col items-center md:items-start space-y-4">
            <h4 className="font-display text-lg text-primary-foreground underline decoration-primary decoration-4 underline-offset-4">Contacto</h4>
            <a 
              href="mailto:kittypau.mascotas@gmail.com" 
              className="flex items-center space-x-3 text-foreground/80 hover:text-primary transition-colors font-sans"
            >
              <Mail className="h-5 w-5 text-primary" />
              <span>kittypau.mascotas@gmail.com</span>
            </a>
          </div>

          {/* Legal/Links */}
          <div className="flex flex-col items-center md:items-start space-y-4">
            <h4 className="font-display text-lg text-primary-foreground underline decoration-primary decoration-4 underline-offset-4">Información</h4>
            <nav className="flex flex-col space-y-2 font-sans text-foreground/80">
              <a href="#planes" className="hover:text-primary transition-colors">Ver Planes</a>
              <a href="#" className="hover:text-primary transition-colors">Privacidad</a>
              <a href="#" className="hover:text-primary transition-colors">Soporte</a>
            </nav>
          </div>
        </div>

        <div className="pt-8 border-t border-primary/10 text-center">
          <p className="font-sans text-sm text-foreground/60 italic">
            © {currentYear} KittyPau - Con amor para tus mascotas 🐾
          </p>
        </div>
      </div>
    </footer>
  );
}