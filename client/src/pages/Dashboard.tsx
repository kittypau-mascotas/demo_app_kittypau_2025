import { useSession } from "@/lib/auth-client";
import { Layout } from "@/components/layout";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { ActivityChart } from "@/components/ActivityChart";
import { LastReadingWidget } from "@/components/LastReadingWidget";
import { WelcomeModal } from "@/components/WelcomeModal";
import { Link } from "wouter";

export default function Dashboard() {
  const { data: session } = useSession();
  
  // Obtener dispositivos para mostrar datos reales
  const { data: devices } = useQuery({
    queryKey: ["devices"],
    queryFn: api.devices.list
  });

  // Usar el primer dispositivo disponible para el gráfico
  const activeDevice = devices?.[0];

  return (
    <Layout>
      <WelcomeModal />
      <div className="space-y-8">
        <div className="text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Hola, {session?.user?.name} 👋
          </h1>
          <p className="text-lg text-gray-600">
            ¡Bienvenido a tu panel de control!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Widget de Última Lectura */}
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 delay-150">
            {activeDevice ? (
              <LastReadingWidget deviceId={activeDevice.id.toString()} />
            ) : (
              <div className="bg-card p-6 rounded-xl shadow-sm border border-border flex flex-col items-center justify-center text-center h-[300px] hover:shadow-lg hover:border-primary transition-all duration-300">
                 <p className="text-muted-foreground mb-4">Vincula un dispositivo para ver datos</p>
              </div>
            )}
          </div>

          {/* Gráfico de Actividad */}
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 delay-300">
            {activeDevice ? (
              <ActivityChart deviceId={activeDevice.id.toString()} /> // Convertimos a string si el ID es numérico
            ) : (
              <div className="bg-card p-6 rounded-xl shadow-sm border border-border flex flex-col items-center justify-center text-center h-[300px] hover:shadow-lg hover:border-primary transition-all duration-300">
                <p className="text-muted-foreground mb-4">No tienes dispositivos vinculados</p>
                <Link href="/devices/add" className="text-primary font-medium hover:underline">Vincular un dispositivo</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}