import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 lg:grid lg:grid-cols-2 items-center gap-12">
      <div>
        <h1 className="font-display text-5xl md:text-6xl text-primary-foreground mb-6 leading-tight">
          Monitoreo inteligente para tu mascota
        </h1>
        <p className="font-sans text-xl text-foreground/80 mb-10">
          Acompañamos el bienestar de tu mascota con datos en tiempo real, para que puedas actuar antes de que un cambio se convierta en un problema.
        </p>
        <Link href="/login">
          <Button className="bg-primary text-primary-foreground font-sans text-xl px-10 py-8 rounded-2xl hover:scale-105 transition-all">
            Empieza ahora
          </Button>
        </Link>
      </div>
      <div className="mt-12 lg:mt-0 relative">
        <img src="/graficas/bandida.jpg" alt="Bandida" className="rounded-3xl shadow-2xl relative z-10 mx-auto max-w-md" />
      </div>
    </section>
  );
}