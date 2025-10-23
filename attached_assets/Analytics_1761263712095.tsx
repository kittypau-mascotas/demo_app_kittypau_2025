import ActivityChart from '@/components/ActivityChart';
import ConsumptionChart from '@/components/ConsumptionChart';
import DurationChart from '@/components/DurationChart';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useState } from 'react';

export default function Analytics() {
  const [timeRange, setTimeRange] = useState('week');

  return (
    <div className="space-y-6" data-testid="page-analytics">
      <div className="flex items-center justify-between">
        <h1 className="titulo text-3xl">Analíticas</h1>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[180px]" data-testid="select-time-range">
            <SelectValue placeholder="Período" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="day">Hoy</SelectItem>
            <SelectItem value="week">Esta Semana</SelectItem>
            <SelectItem value="month">Este Mes</SelectItem>
            <SelectItem value="year">Este Año</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ActivityChart />
        <ConsumptionChart />
      </div>

      <div className="grid grid-cols-1 gap-6">
        <DurationChart />
      </div>
    </div>
  );
}
