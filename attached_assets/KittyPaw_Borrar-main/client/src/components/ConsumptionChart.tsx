import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface ConsumptionChartProps {
  data?: Array<{ name: string; [key: string]: number | string }>;
}

export default function ConsumptionChart({ data }: ConsumptionChartProps) {
  //todo: remove mock functionality
  const mockData = data || [
    { name: 'Lun', Luna: 120, Max: 280 },
    { name: 'Mar', Luna: 110, Max: 270 },
    { name: 'Mié', Luna: 130, Max: 290 },
    { name: 'Jue', Luna: 125, Max: 285 },
    { name: 'Vie', Luna: 115, Max: 275 },
    { name: 'Sáb', Luna: 100, Max: 270 },
    { name: 'Dom', Luna: 95, Max: 265 },
  ];

  return (
    <Card className="card-device border-0" data-testid="chart-consumption">
      <CardHeader>
        <CardTitle>Consumo de Alimento</CardTitle>
        <CardDescription>Gramos consumidos por día</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={mockData}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Luna" fill="hsl(var(--chart-1))" name="Luna (Gato)" />
            <Bar dataKey="Max" fill="hsl(var(--chart-3))" name="Max (Perro)" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
