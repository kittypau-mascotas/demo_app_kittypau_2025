-- Esquema de Base de Datos para KittyPau (PostgreSQL)

-- Tabla para los hogares o cuentas de usuario
CREATE TABLE households (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabla para las mascotas
CREATE TABLE pets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    household_id UUID NOT NULL REFERENCES households(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL, -- Ej: 'Gato', 'Perro'
    breed VARCHAR(100),
    birth_date DATE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabla para los dispositivos IoT
CREATE TABLE devices (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    device_id_str VARCHAR(255) UNIQUE NOT NULL, -- ID del dispositivo físico (ej: MAC, número de serie)
    household_id UUID REFERENCES households(id) ON DELETE SET NULL,
    pet_id UUID REFERENCES pets(id) ON DELETE SET NULL, -- Dispositivo asignado a una mascota específica
    name VARCHAR(255) NOT NULL,
    model VARCHAR(100),
    status VARCHAR(50) DEFAULT 'offline', -- 'online', 'offline', 'error'
    last_seen TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabla para lecturas de sensores
CREATE TABLE sensor_readings (
    id BIGSERIAL PRIMARY KEY,
    device_id UUID NOT NULL REFERENCES devices(id) ON DELETE CASCADE,
    timestamp TIMESTAMPTZ DEFAULT NOW(),
    sensor_type VARCHAR(50) NOT NULL, -- 'temperature', 'humidity', 'weight', 'motion'
    value DOUBLE PRECISION NOT NULL,
    unit VARCHAR(20)
);

-- Tabla para el estado de salud y conectividad del dispositivo
CREATE TABLE device_health (
    id BIGSERIAL PRIMARY KEY,
    device_id UUID NOT NULL REFERENCES devices(id) ON DELETE CASCADE,
    timestamp TIMESTAMPTZ DEFAULT NOW(),
    battery_level REAL, -- Nivel de batería en porcentaje
    wifi_signal_strength INT, -- en dBm
    uptime_seconds BIGINT,
    firmware_version VARCHAR(50)
);

-- Crear índices para mejorar el rendimiento de las consultas
CREATE INDEX idx_pets_household_id ON pets(household_id);
CREATE INDEX idx_devices_household_id ON devices(household_id);
CREATE INDEX idx_sensor_readings_device_id_timestamp ON sensor_readings(device_id, timestamp DESC);
CREATE INDEX idx_device_health_device_id_timestamp ON device_health(device_id, timestamp DESC);
