import { Thermometer, Utensils, Wifi, Activity } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  {
    title: "Monitoreo en tiempo real",
    description: "Sensores de temperatura y humedad permiten entender el ambiente que rodea a tu mascota y detectar variaciones relevantes desde el dashboard.",
    icon: Thermometer,
  },
  {
    title: "Control de alimentación",
    description: "El sensor de peso registra la ingesta y permite ver cuánto consume tu mascota, usando el dato 'weightGrams' de la telemetría del sistema.",
    icon: Utensils,
  },
  {
    title: "Estado del dispositivo",
    description: "Consulta nivel de batería, conexión Wi-Fi y última lectura para saber si el dispositivo está operativo y enviando datos.",
    icon: Wifi,
  },
  {
    title: "Prevención con datos",
    description: "KittyPau no solo captura lecturas: transforma comportamiento cotidiano en información útil para decisiones de cuidado.",
    icon: Activity,
  },
];

export default function FeaturesSection() {
  return (
    <section id="caracteristicas" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Encabezado de la sección */}
        <div className="text-center mb-20">
          <h2 className="font-brand text-4xl md:text-5xl text-primary mb-6 tracking-tight">
            Características Principales
          </h2>
          <p className="font-sans text-lg text-foreground/80 max-w-2xl mx-auto leading-relaxed">
            Traducimos tecnología IoT avanzada en beneficios comprensibles para el cuidado diario de tu mascota.
          </p>
        </div>

        {/* Grid de Características */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="bg-card rounded-2xl shadow-md border border-primary/10 hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
            >
              <CardHeader className="pb-4">
                {/* Icon Container con el token primary y opacidad sutil */}
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                  <feature.icon 
                    className="w-7 h-7 text-primary" 
                    strokeWidth={2.5} 
                  />
                </div>
                <CardTitle className="font-brand text-2xl text-primary-foreground">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-sans text-base text-foreground/90 leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}