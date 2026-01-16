import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface StatWidgetProps {
  title: string;
  value: string;
  description: string;
  icon: LucideIcon;
  statusVariant?: 'ok' | 'warning' | 'alert' | 'default'; // New prop for semantic status
}

export default function StatWidget({
  title,
  value,
  description,
  icon: Icon,
  statusVariant = 'default',
}: StatWidgetProps) {
  let backgroundColorClass = 'bg-card'; // Default background
  let textColorClass = 'text-card-foreground'; // Default text color

  switch (statusVariant) {
    case 'ok':
      backgroundColorClass = 'bg-green-100 dark:bg-green-900'; // Using Tailwind classes for semantic colors
      textColorClass = 'text-green-800 dark:text-green-200';
      break;
    case 'warning':
      backgroundColorClass = 'bg-yellow-100 dark:bg-yellow-900';
      textColorClass = 'text-yellow-800 dark:text-yellow-200';
      break;
    case 'alert':
      backgroundColorClass = 'bg-red-100 dark:bg-red-900';
      textColorClass = 'text-red-800 dark:text-red-200';
      break;
    case 'default':
    default:
        // Use existing card background, no specific semantic color applied by variant
        break;
  }

  // Use the Card component from shadcn/ui that we just updated in Task 4
  return (
    <Card className={cn("flex flex-col", backgroundColorClass, textColorClass)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className={cn("h-4 w-4 text-muted-foreground", textColorClass)} aria-label={title} />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}
