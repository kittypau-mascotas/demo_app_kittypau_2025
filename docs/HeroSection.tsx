import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <section className="relative pt-16 pb-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-12 items-center">
          {/* Texto */}
          <div className="mb-12 lg:mb-0">
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl text-primary-foreground leading-[1.1] mb-6">
              Monitoreo inteligente para tu mascota
            </h1>
            <p className="font-sans text-xl md:text-2xl text-foreground/90 leading-relaxed mb-10">
              Acompañamos el bienestar de tu mascota con datos en tiempo real, para que puedas actuar antes de que un cambio se convierta en un problema.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/login">
                <Button className="bg-primary text-primary-foreground font-sans text-xl px-10 py-8 rounded-2xl shadow-lg hover:scale-105 transition-all">
                  Empieza ahora
                </Button>
              </Link>
              <a href="#planes">
                <Button variant="outline" className="border-primary/20 font-sans text-xl px-10 py-8 rounded-2xl hover:bg-primary/5">
                  Ver planes
                </Button>
              </a>
            </div>
          </div>

          {/* Imagen - Bandida */}
          <div className="relative">
            <div className="absolute -inset-4 bg-primary/10 rounded-full blur-3xl" />
            <img 
              src="/illustrations/bandida.png" 
              alt="Mascota KittyPau - Bandida"
              className="relative w-full max-w-lg mx-auto drop-shadow-2xl animate-in fade-in zoom-in duration-1000"
            />
          </div>
        </div>
      </div>
    </section>
  );
}