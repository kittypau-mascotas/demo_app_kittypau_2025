import DeviceCard from '../DeviceCard';
import feederImage from '@assets/generated_images/Smart_feeder_device_6415df93.png';

export default function DeviceCardExample() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      <DeviceCard
        name="Comedero Principal"
        type="Dispensador de Comida"
        status="active"
        lastUpdate="Hace 5 minutos"
        batteryLevel={85}
        imageUrl={feederImage}
      />
      <DeviceCard
        name="Arenero Inteligente"
        type="Monitor de Arenero"
        status="warning"
        lastUpdate="Hace 2 horas"
        batteryLevel={45}
      />
      <DeviceCard
        name="Bebedero Automático"
        type="Dispensador de Agua"
        status="error"
        lastUpdate="Hace 1 día"
        batteryLevel={15}
      />
    </div>
  );
}
