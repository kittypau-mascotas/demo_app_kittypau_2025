import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-primary/10 bg-background/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-20">
        <Link href="/" className="font-display text-3xl text-primary tracking-tight">KittyPau</Link>
        <div className="hidden md:flex items-center space-x-8 font-sans">
          <a href="#caracteristicas" className="hover:text-primary transition-colors">Características</a>
          <a href="#como-funciona" className="hover:text-primary transition-colors">Cómo funciona</a>
          <a href="#planes" className="hover:text-primary transition-colors">Planes</a>
          <Link href="/login">
            <Button className="bg-primary text-primary-foreground rounded-2xl px-6">Iniciar Sesión</Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}