import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface ConsumptionChartProps {
  data?: Array<{ name: string; [key: string]: number | string }>;
}

const colors = ["hsl(var(--chart-1))", "hsl(var(--chart-2))", "hsl(var(--chart-3))", "hsl(var(--chart-4))", "hsl(var(--chart-5))"];

export default function ConsumptionChart({ data }: ConsumptionChartProps) {
  if (!data || data.length === 0) {
    return (
      <Card className="card-device border-0" data-testid="chart-consumption">
        <CardHeader>
          <CardTitle>Consumo de Alimento</CardTitle>
          <CardDescription>Gramos consumidos por día</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-center py-10">No hay datos de consumo disponibles.</p>
        </CardContent>
      </Card>
    );
  }

  // Extract device names (keys other than 'name') from the first data entry
  const deviceNames = Object.keys(data[0]).filter(key => key !== 'name');

  return (
    <Card className="card-device border-0" data-testid="chart-consumption">
      <CardHeader>
        <CardTitle>Consumo de Alimento</CardTitle>
        <CardDescription>Gramos consumidos por día</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            {deviceNames.map((deviceName, index) => (
              <Bar key={deviceName} dataKey={deviceName} fill={colors[index % colors.length]} name={deviceName} />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
