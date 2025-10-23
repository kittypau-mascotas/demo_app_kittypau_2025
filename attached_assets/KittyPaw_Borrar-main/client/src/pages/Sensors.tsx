import DeviceStatus from '@/components/DeviceStatus';

export default function Sensors() {
  //todo: remove mock functionality
  const mockSensors = [
    {
      deviceName: 'Comedero Principal',
      temperature: 22,
      humidity: 45,
      battery: 85,
      lastUpdate: 'Hace 5 minutos',
    },
    {
      deviceName: 'Arenero Inteligente',
      temperature: 24,
      humidity: 50,
      battery: 60,
      lastUpdate: 'Hace 1 hora',
    },
    {
      deviceName: 'Bebedero Automático',
      temperature: 20,
      battery: 30,
      lastUpdate: 'Hace 3 horas',
    },
    {
      deviceName: 'Cámara de Vigilancia',
      temperature: 23,
      humidity: 42,
      battery: 90,
      lastUpdate: 'Hace 2 minutos',
    },
  ];

  return (
    <div className="space-y-6" data-testid="page-sensors">
      <h1 className="titulo text-3xl">Sensores</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockSensors.map((sensor) => (
          <DeviceStatus key={sensor.deviceName} {...sensor} />
        ))}
      </div>
    </div>
  );
}
