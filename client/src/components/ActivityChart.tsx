import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { subDays, subHours, format } from "date-fns";
import { es } from "date-fns/locale";

interface ActivityChartProps {
  deviceId?: string;
  data?: any[];
  title?: string;
  unit?: string;
}

export function ActivityChart({ deviceId, data: externalData, title = "Actividad Reciente", unit = "Eventos" }: ActivityChartProps) {
  const [range, setRange] = useState<'24h' | '7d'>('7d');

  const startDate = range === '24h' 
    ? subHours(new Date(), 24) 
    : subDays(new Date(), 7);
  
  const { data: fetchedData, isLoading } = useQuery({
    queryKey: ["telemetry", deviceId, range],
    queryFn: () => api.telemetry.list(deviceId!, { 
      startDate: startDate.toISOString(),
      limit: 1000 
    }),
    enabled: !!deviceId && !externalData
  });

  if (isLoading && !externalData) {
    return (
      <Card className="h-full hover:shadow-lg hover:border-primary transition-all duration-300">
        <CardHeader><CardTitle>{title}</CardTitle></CardHeader>
        <CardContent className="h-[300px] flex items-center justify-center">
          <span className="text-muted-foreground">Cargando datos...</span>
        </CardContent>
      </Card>
    );
  }

  let processedData = externalData || [];

  if (!externalData && fetchedData) {
    // Procesar datos dinámicamente según el rango
    processedData = (fetchedData || []).reduce((acc: any[], curr: any) => {
      const dateObj = new Date(curr.createdAt || curr.ts);
      if (isNaN(dateObj.getTime())) return acc;
      
      // Clave única para agrupar (Hora o Día)
      const bucketKey = range === '24h' 
          ? format(dateObj, "yyyy-MM-dd HH") 
          : format(dateObj, "yyyy-MM-dd");

      // Etiqueta legible (14:00 o Lun)
      const displayLabel = range === '24h'
          ? format(dateObj, "HH:00")
          : format(dateObj, "EEE", { locale: es });
      
      const existing = acc.find((item: any) => item.bucket === bucketKey);
      
      if (existing) {
        existing.value += 1;
      } else {
        acc.push({ 
            bucket: bucketKey, 
            name: displayLabel, 
            value: 1, 
            sortDate: dateObj 
        });
      }
      return acc;
    }, []).sort((a: any, b: any) => a.sortDate.getTime() - b.sortDate.getTime());
  }

  return (
    <Card className="h-full hover:shadow-lg hover:border-primary transition-all duration-300">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-base font-medium">{title}</CardTitle>
        {!externalData && (
          <div className="flex gap-1 bg-muted/50 p-1 rounded-lg">
            <Button 
              variant={range === '24h' ? 'secondary' : 'ghost'} 
              size="sm" 
              className="h-7 text-xs"
              onClick={() => setRange('24h')}
            >
              24h
            </Button>
            <Button 
              variant={range === '7d' ? 'secondary' : 'ghost'} 
              size="sm" 
              className="h-7 text-xs"
              onClick={() => setRange('7d')}
            >
              7d
            </Button>
          </div>
        )}
      </CardHeader>
      <CardContent className="h-[300px]">
        {processedData.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={processedData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="name" 
                tickLine={false}
                axisLine={false}
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                dy={10}
              />
              <YAxis 
                tickLine={false}
                axisLine={false}
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                allowDecimals={false}
              />
              <Tooltip 
                cursor={{ fill: 'hsl(var(--muted)/0.2)' }}
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))', 
                  borderColor: 'hsl(var(--border))',
                  borderRadius: 'var(--radius)',
                  color: 'hsl(var(--foreground))'
                }}
                labelStyle={{ fontWeight: 'bold', marginBottom: '0.25rem' }}
              />
              <Bar 
                dataKey="value" 
                fill="hsl(var(--primary))" 
                radius={[4, 4, 0, 0]} 
                name={unit}
              />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-center p-4">
            <div className="bg-muted/30 p-3 rounded-full mb-3">
              <span className="text-2xl grayscale opacity-50">📊</span>
            </div>
            <p className="text-sm font-medium text-foreground">Sin actividad registrada</p>
            <p className="text-xs text-muted-foreground mt-1">
              {!externalData ? `No hay datos para ${range === '24h' ? 'las últimas 24 horas' : 'los últimos 7 días'}.` : 'No hay datos disponibles.'}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
