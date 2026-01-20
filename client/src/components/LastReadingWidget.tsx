import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Thermometer, Droplets, Clock } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";

export function LastReadingWidget({ deviceId }: { deviceId: string }) {
  const { data, isLoading } = useQuery({
    queryKey: ["telemetry", deviceId, "latest"],
    queryFn: () => api.telemetry.list(deviceId, { limit: 1 }),
    refetchInterval: 30000 // Actualizar cada 30 segundos
  });

  const reading = data?.[0];

  if (isLoading) {
    return (
      <Card className="h-full hover:shadow-lg hover:border-primary transition-all duration-300">
        <CardHeader><CardTitle>Última Lectura</CardTitle></CardHeader>
        <CardContent className="flex items-center justify-center h-[200px]">
          <span className="text-muted-foreground">Cargando...</span>
        </CardContent>
      </Card>
    );
  }

  if (!reading) {
    return (
      <Card className="h-full hover:shadow-lg hover:border-primary transition-all duration-300">
        <CardHeader><CardTitle>Última Lectura</CardTitle></CardHeader>
        <CardContent className="flex items-center justify-center h-[200px]">
          <span className="text-muted-foreground">Sin datos recientes</span>
        </CardContent>
      </Card>
    );
  }

  // Soporte para ambos nombres de campo por compatibilidad
  const temp = reading.temperature ?? reading.temperatureCelsius;
  const hum = reading.humidity ?? reading.humidityPercent;
  const date = reading.createdAt ?? reading.ts;

  // Lógica de alertas visuales
  const tempValue = temp != null ? Number(temp) : null;
  const isHighTemp = tempValue !== null && tempValue > 30;

  return (
    <Card className="h-full hover:shadow-lg hover:border-primary transition-all duration-300">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-primary" />
          Última Lectura
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
            {/* Tarjeta de Temperatura con cambio de color */}
            <div className={`flex flex-col items-center p-4 rounded-xl border transition-colors duration-300 ${
                isHighTemp 
                  ? "bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800" 
                  : "bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800"
              }`}>
                <div className={`p-2 rounded-full mb-2 ${
                  isHighTemp ? "bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-200" : "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-200"
                }`}>
                  <Thermometer className="w-6 h-6" />
                </div>
                <span className={`text-sm font-medium ${isHighTemp ? "text-red-700 dark:text-red-300" : "text-green-700 dark:text-green-300"}`}>
                  Temp
                </span>
                <span className={`text-2xl font-bold ${isHighTemp ? "text-red-900 dark:text-red-100" : "text-green-900 dark:text-green-100"}`}>
                  {temp != null ? `${Number(temp).toFixed(1)}°C` : "--"}
                </span>
            </div>

            <div className="flex flex-col items-center p-4 bg-blue-50 rounded-xl border border-blue-100 dark:bg-blue-900/20 dark:border-blue-800">
                <div className="p-2 bg-blue-100 rounded-full text-blue-600 mb-2 dark:bg-blue-900 dark:text-blue-200">
                <Droplets className="w-6 h-6" />
                </div>
                <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Humedad</span>
                <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {hum != null ? `${Number(hum).toFixed(0)}%` : "--"}
                </span>
            </div>
        </div>

        <div className="text-center text-xs text-muted-foreground">
          Actualizado {date ? formatDistanceToNow(new Date(date), { addSuffix: true, locale: es }) : 'desconocido'}
        </div>
      </CardContent>
    </Card>
  );
}