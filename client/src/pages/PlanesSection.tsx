import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";

const plans = [
  {
    name: "Plan Gratuito",
    id: "plan_a",
    description: "Monitoreo básico de un dispositivo para empezar a conocer el valor del sistema.",
    features: [
      "1 dispositivo vinculado",
      "Acceso a lectura básica",
      "Monitoreo ambiental simple",
      "Entrada al ecosistema KittyPau"
    ],
    cta: "Empezar Gratis",
    link: "/login",
    highlight: false
  },
  {
    name: "Plan Premium",
    id: "plan_b",
    description: "Ideal para quienes quieren más historial, mejores analíticas y alertas críticas.",
    features: [
      "Historial extendido de datos",
      "Analíticas avanzadas de conducta",
      "Alertas críticas inmediatas",
      "Mejor visibilidad de patrones"
    ],
    cta: "Obtener Premium",
    link: "/login",
    highlight: true
  }
];

export default function PlanesSection() {
  return (
    <section id="planes" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="font-display text-4xl md:text-5xl text-primary mb-6 tracking-tight">
            Planes pensados para ellos
          </h2>
          <p className="font-sans text-lg text-foreground/80 max-w-2xl mx-auto leading-relaxed">
            Nuestros planes se adaptan al nivel de seguimiento que tu mascota necesita hoy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan) => (
            <Card 
              key={plan.id}
              className={`rounded-2xl shadow-md border flex flex-col transition-all duration-300 hover:shadow-lg ${
                plan.highlight 
                ? 'border-primary/40 bg-primary/5 ring-1 ring-primary/20 scale-105 z-10' 
                : 'border-primary/10 bg-card'
              }`}
            >
              <CardHeader className="text-center pt-8 pb-4">
                <CardTitle className="font-display text-3xl text-primary-foreground mb-4">
                  {plan.name}
                </CardTitle>
                <p className="font-sans text-base text-foreground/70 leading-snug px-2">
                  {plan.description}
                </p>
              </CardHeader>
              <CardContent className="flex-grow pt-6">
                <ul className="space-y-4">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start text-foreground/90">
                      <Check className="h-5 w-5 text-primary shrink-0 mr-3 mt-0.5" strokeWidth={3} />
                      <span className="font-sans text-base">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="pb-8 pt-8">
                <Link href={plan.link} className="w-full">
                  <Button 
                    className={`w-full font-sans text-lg py-7 rounded-2xl shadow-sm transition-all hover:scale-[1.02] ${
                      plan.highlight 
                      ? 'bg-primary text-primary-foreground hover:shadow-md' 
                      : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                    }`}
                  >
                    {plan.cta}
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}