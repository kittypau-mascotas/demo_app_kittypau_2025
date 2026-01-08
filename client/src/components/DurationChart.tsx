import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface DurationChartProps {
  data?: Array<{ name: string; value: number }>;
}

export default function DurationChart({ data }: DurationChartProps) {
  if (!data || data.length === 0) {
    return (
      <Card className="card-info border-0" data-testid="chart-duration">
        <CardHeader>
          <CardTitle>Duración de Uso</CardTitle>
          <CardDescription>Horas de actividad por periodo</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-center py-10">No hay datos de duración disponibles.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="card-info border-0" data-testid="chart-duration">
      <CardHeader>
        <CardTitle>Duración de Uso</CardTitle>
        <CardDescription>Horas de actividad por periodo</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={data}>
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
