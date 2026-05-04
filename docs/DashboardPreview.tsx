import { Card, CardContent } from "@/components/ui/card";
import { Activity, Battery, Thermometer, Droplets } from "lucide-react";

export default function DashboardPreview() {
  return (
    <section className="py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl text-primary mb-4">Así se ve el seguimiento de tu mascota</h2>
          <p className="font-sans text-lg text-foreground/70">Diseñado para leer el estado de tu mejor amigo en segundos.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Simulación de Widgets Reales */}
          <div className="lg:col-span-2 bg-card border border-primary/10 rounded-2xl shadow-xl p-8 overflow-hidden">
             <div className="flex items-center justify-between mb-8">
                <h3 className="font-display text-2xl text-primary-foreground">Actividad Reciente</h3>
                <div className="flex gap-2">
                   <div className="w-3 h-3 rounded-full bg-primary" />
                   <div className="w-3 h-3 rounded-full bg-secondary" />
                </div>
             </div>
             {/* Espacio para la representación visual de la gráfica */}
             <div className="h-64 w-full bg-primary/5 rounded-xl border border-dashed border-primary/20 flex items-center justify-center">
                <Activity className="w-12 h-12 text-primary/40 animate-pulse" />
             </div>
          </div>

          <div className="flex flex-col gap-6">
            <MetricMock icon={Thermometer} label="Temperatura" value="22.5°C" status="Ideal" />
            <MetricMock icon={Droplets} label="Humedad" value="45%" status="Óptimo" />
            <MetricMock icon={Battery} label="Batería" value="85%" status="Cargado" />
          </div>
        </div>
      </div>
    </section>
  );
}

function MetricMock({ icon: Icon, label, value, status }: any) {
  return (
    <Card className="rounded-2xl border-primary/10 shadow-md">
      <CardContent className="flex items-center p-6">
        <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mr-4">
          <Icon className="text-primary" />
        </div>
        <div>
          <p className="font-sans text-sm text-foreground/60">{label}</p>
          <div className="flex items-baseline gap-2">
            <span className="font-display text-xl text-primary-foreground">{value}</span>
            <span className="font-sans text-xs text-green-500 font-bold uppercase">{status}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}