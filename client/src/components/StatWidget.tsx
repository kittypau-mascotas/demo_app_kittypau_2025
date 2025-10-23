import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

interface StatWidgetProps {
  title: string;
  value: string | number;
  description?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  variant?: 'data' | 'device' | 'info';
}

export default function StatWidget({
  title,
  value,
  description,
  icon: Icon,
  trend,
  variant = 'data',
}: StatWidgetProps) {
  const variantClasses = {
    data: 'card-data border-0',
    device: 'card-device border-0',
    info: 'card-info border-0',
  };

  return (
    <Card className={`${variantClasses[variant]} hover-elevate`} data-testid={`stat-${title.toLowerCase().replace(/\s/g, '-')}`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-5 w-5 opacity-70" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold" data-testid={`stat-value-${title.toLowerCase().replace(/\s/g, '-')}`}>{value}</div>
        {description && <p className="text-xs opacity-70 mt-1">{description}</p>}
        {trend && (
          <p className={`text-xs mt-2 ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
            {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
          </p>
        )}
      </CardContent>
    </Card>
  );
}