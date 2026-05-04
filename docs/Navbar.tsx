import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-primary/10 bg-background/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-display text-3xl text-primary tracking-tight">
              KittyPau
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#caracteristicas" className="font-sans text-lg text-foreground/80 hover:text-primary transition-colors">
              Características
            </a>
            <a href="#como-funciona" className="font-sans text-lg text-foreground/80 hover:text-primary transition-colors">
              Cómo funciona
            </a>
            <a href="#planes" className="font-sans text-lg text-foreground/80 hover:text-primary transition-colors">
              Planes
            </a>
            
            <Link href="/login">
              <Button className="bg-primary text-primary-foreground font-sans text-lg px-6 py-2 rounded-2xl shadow-sm hover:shadow-md transition-all">
                Iniciar Sesión
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}