import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTheme } from 'next-themes'; // Assuming next-themes is used for dark mode
import { cn } from '@/lib/utils'; // Import cn

// Custom Tooltip component to match card styling and humanize content
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <Card className="p-2 shadow-lg">
        <p className="text-sm font-bold">{`Fecha: ${label}`}</p>
        {payload.map((entry: any, index: number) => (
          <p key={`item-${index}`} style={{ color: entry.stroke }}>
            {`${entry.name}: ${entry.value} g`} {/* Assuming consumption is in grams */}
          </p>
        ))}
        <p className="text-xs text-muted-foreground mt-1">¡Buen provecho!</p> {/* Example humanized text */}
      </Card>
    );
  }
  return null;
};

interface ConsumptionChartProps {
  data: any[]; // Data for the chart
  title?: string;
  unit?: string; // Unit to display in tooltip
}

export default function ConsumptionChart({ data, title = 'Consumo de Alimento', unit = 'g' }: ConsumptionChartProps) {
  const { theme } = useTheme(); // Get current theme
  const strokeColor = theme === 'dark' ? 'hsl(var(--foreground))' : 'hsl(var(--foreground))'; // Adjust based on your theme vars

  // Extract all unique data keys (device names) from the data, excluding 'name'
  const deviceNames = data.length > 0
    ? Object.keys(data[0]).filter(key => key !== 'name')
    : [];

  const chartColors = [
    "hsl(var(--chart-1))",
    "hsl(var(--chart-2))",
    "hsl(var(--chart-3))",
    "hsl(var(--chart-4))",
    "hsl(var(--chart-5))",
  ];

  return (
    <Card className="h-[400px]">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="h-[calc(100%-60px)]"> {/* Adjust height to account for header */}
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
            <XAxis dataKey="name" stroke={strokeColor} />
            <YAxis stroke={strokeColor} unit={unit} />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            {deviceNames.map((deviceName, index) => (
              <Line
                key={deviceName}
                type="monotone"
                dataKey={deviceName}
                stroke={chartColors[index % chartColors.length]} // Assign colors cyclically
                strokeWidth={2}
                activeDot={{ r: 8 }}
                isAnimationActive={true} // Animated line drawing
                animationDuration={1500}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
