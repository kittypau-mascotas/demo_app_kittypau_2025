import DeviceStatus from '../DeviceStatus';

export default function DeviceStatusExample() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
      <DeviceStatus
        deviceName="Comedero Principal"
        temperature={22}
        humidity={45}
        battery={85}
        lastUpdate="Hace 5 minutos"
      />
      <DeviceStatus
        deviceName="Arenero Inteligente"
        temperature={24}
        battery={60}
        lastUpdate="Hace 1 hora"
      />
    </div>
  );
}
