import { Plug, Link, LineChart } from "lucide-react";

const steps = [
  {
    icon: Plug,
    title: "Conecta",
    description: "Configura tu dispositivo ESP32 y prepáralo para capturar datos de tu mascota.",
  },
  {
    icon: Link,
    title: "Vincula",
    description: "Registra a tu mascota en la plataforma y asocia el dispositivo con su perfil.",
  },
  {
    icon: LineChart,
    title: "Monitorea",
    description: "Recibe datos en tiempo real mediante la capa IoT del sistema y visualízalos en el dashboard.",
  },
];

export default function HowItWorksSection() {
  return (
    <section id="como-funciona" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Encabezado de la sección */}
        <div className="text-center mb-20">
          <h2 className="font-brand text-4xl md:text-5xl text-primary mb-6 tracking-tight">
            ¿Cómo funciona KittyPau?
          </h2>
          <p className="font-sans text-lg text-foreground/80 max-w-2xl mx-auto leading-relaxed">
            Nuestro sistema está diseñado para ser intuitivo y eficiente, guiándote en cada paso para el monitoreo de tu mascota.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative flex flex-col md:flex-row justify-center items-center md:items-start space-y-12 md:space-y-0 md:space-x-12">
          {/* Línea divisoria para desktop */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-primary/30 transform -translate-y-1/2 mx-20"></div>
          {/* Línea divisoria para mobile */}
          <div className="md:hidden absolute left-1/2 top-0 bottom-0 w-0.5 bg-primary/30 transform -translate-x-1/2 my-10"></div>

          {steps.map((step, index) => (
            <div 
              key={index} 
              className="relative flex flex-col items-center text-center p-4 md:w-1/3 z-10"
            >
              {/* Círculo del paso */}
              <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center mb-4 shadow-lg">
                <step.icon className="w-8 h-8" strokeWidth={2} />
              </div>
              {/* Número del paso */}
              <div className="absolute -top-4 md:-top-8 text-sm font-bold text-primary-foreground bg-primary rounded-full px-2 py-0.5">
                Paso {index + 1}
              </div>
              <h3 className="font-brand text-2xl text-primary-foreground mb-2 mt-4">
                {step.title}
              </h3>
              <p className="font-sans text-base text-foreground/90 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}