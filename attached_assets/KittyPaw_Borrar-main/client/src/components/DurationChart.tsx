import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface DurationChartProps {
  data?: Array<{ name: string; value: number }>;
}

export default function DurationChart({ data }: DurationChartProps) {
  //todo: remove mock functionality
  const mockData = data || [
    { name: '00:00', value: 0 },
    { name: '04:00', value: 2 },
    { name: '08:00', value: 5 },
    { name: '12:00', value: 8 },
    { name: '16:00', value: 6 },
    { name: '20:00', value: 4 },
    { name: '24:00', value: 1 },
  ];

  return (
    <Card className="card-info border-0" data-testid="chart-duration">
      <CardHeader>
        <CardTitle>Duración de Uso</CardTitle>
        <CardDescription>Horas de actividad por periodo</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={mockData}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="value" stroke="hsl(var(--chart-2))" fill="hsl(var(--chart-2))" fillOpacity={0.6} />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
