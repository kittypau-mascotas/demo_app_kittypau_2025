import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface ActivityChartProps {
  data?: Array<{ name: string; [key: string]: number | string }>;
}

export default function ActivityChart({ data }: ActivityChartProps) {
  //todo: remove mock functionality
  const mockData = data || [
    { name: 'Lun', Bandida: 65, Bruno: 45 },
    { name: 'Mar', Bandida: 59, Bruno: 52 },
    { name: 'Mié', Bandida: 80, Bruno: 68 },
    { name: 'Jue', Bandida: 81, Bruno: 72 },
    { name: 'Vie', Bandida: 56, Bruno: 48 },
    { name: 'Sáb', Bandida: 55, Bruno: 60 },
    { name: 'Dom', Bandida: 40, Bruno: 38 },
  ];

  return (
    <Card className="card-data border-0" data-testid="chart-activity">
      <CardHeader>
        <CardTitle>Actividad Semanal</CardTitle>
        <CardDescription>Nivel de actividad de tus mascotas</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={mockData}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="Bandida" stroke="hsl(var(--chart-1))" strokeWidth={2} name="Bandida (Gato)" />
            <Line type="monotone" dataKey="Bruno" stroke="hsl(var(--chart-3))" strokeWidth={2} name="Bruno (Perro)" />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
