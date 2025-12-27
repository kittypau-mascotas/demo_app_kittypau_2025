import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface ConsumptionChartProps {
  data?: Array<{ name: string; [key: string]: number | string }>;
}

export default function ConsumptionChart({ data }: ConsumptionChartProps) {
  //todo: remove mock functionality
  const mockData = data || [
    { name: 'Lun', Bandida: 120, Bruno: 280 },
    { name: 'Mar', Bandida: 110, Bruno: 270 },
    { name: 'Mié', Bandida: 130, Bruno: 290 },
    { name: 'Jue', Bandida: 125, Bruno: 285 },
    { name: 'Vie', Bandida: 115, Bruno: 275 },
    { name: 'Sáb', Bandida: 100, Bruno: 270 },
    { name: 'Dom', Bandida: 95, Bruno: 265 },
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
            <Bar dataKey="Bandida" fill="hsl(var(--chart-1))" name="Bandida (Gato)" />
            <Bar dataKey="Bruno" fill="hsl(var(--chart-3))" name="Bruno (Perro)" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
