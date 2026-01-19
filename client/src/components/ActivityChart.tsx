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
    const data = payload[0].payload; // Access the full data point
    return (
      <Card className="p-2 shadow-lg">
        <p className="text-sm font-bold">{`Fecha: ${label}`}</p>
        {payload.map((entry: any, index: number) => (
          <p key={`item-${index}`} style={{ color: entry.stroke }}>
            {`${entry.name}: ${entry.value} ${data.unit || ''}`} {/* Add unit if available */}
          </p>
        ))}
        <p className="text-xs text-muted-foreground mt-1">¡Todo bajo control!</p> {/* Example humanized text */}
      </Card>
    );
  }
  return null;
};


interface ActivityChartProps {
  data: any[]; // Data for the chart
  dataKey?: string; // The key in data objects for the line (e.g., "Activity")
  title?: string;
  unit?: string; // Unit to display in tooltip
}

export default function ActivityChart({ data, dataKey = 'Activity', title = 'Actividad Reciente', unit = '' }: ActivityChartProps) {
  const { theme } = useTheme(); // Get current theme
  const strokeColor = theme === 'dark' ? 'hsl(var(--foreground))' : 'hsl(var(--foreground))'; // Adjust based on your theme vars

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
            <Line
              type="monotone"
              dataKey={dataKey}
              stroke="hsl(var(--chart-1))" // Using chart-1 color
              strokeWidth={2}
              activeDot={{ r: 8 }}
              isAnimationActive={true} // Animated line drawing
              animationDuration={500} // Faster animation for real-time updates
              animationEasing="ease-in-out"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
