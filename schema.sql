-- Esquema de Base de Datos para KittyPau v2 (PostgreSQL)
-- Arquitectura optimizada para IoT, Neon Auth y Vercel.

-- Primero, definimos un tipo ENUM para los eventos de dispositivo,
-- esto normaliza los datos y previene errores por typos.
CREATE TYPE device_event_type AS ENUM (
  'online',
  'offline',
  'reboot',
  'error',
  'low_battery',
  'sensor_error'
);

-- Tabla de usuarios, diseñada para integrarse con un proveedor de identidad externo como Neon Auth.
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    auth_user_id UUID UNIQUE NOT NULL, -- El UUID que provee el servicio de autenticación.
    email VARCHAR(255) UNIQUE,
    full_name VARCHAR(255),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabla de dispositivos IoT. El 'device_id' es la identidad física/lógica que el dispositivo usa en MQTT.
CREATE TABLE devices (
    id SERIAL PRIMARY KEY,
    device_id VARCHAR(50) UNIQUE NOT NULL, -- Ej: "KPCL0033". Es la identidad principal en el mundo IoT.
    user_id INT NOT NULL,
    name VARCHAR(100) NOT NULL DEFAULT 'Mi Dispositivo KittyPaw',
    status VARCHAR(50) DEFAULT 'offline', -- 'online', 'offline', 'error'. Refleja el último estado conocido.
    last_seen TIMESTAMPTZ, -- Se actualiza con cualquier comunicación del dispositivo.
    created_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT fk_user
        FOREIGN KEY(user_id) 
        REFERENCES users(id)
        ON DELETE CASCADE
);

-- Tabla de mascotas. Cada mascota pertenece a un usuario y puede estar asociada a un dispositivo.
CREATE TABLE pets (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    device_id INT UNIQUE, -- Una mascota puede estar asociada a UN dispositivo.
    name VARCHAR(100) NOT NULL,
    species VARCHAR(50), -- Ej: "Gato", "Perro"
    breed VARCHAR(100),
    birth_date DATE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT fk_user
        FOREIGN KEY(user_id) 
        REFERENCES users(id)
        ON DELETE CASCADE,
    CONSTRAINT fk_device
        FOREIGN KEY(device_id) 
        REFERENCES devices(id)
        ON DELETE SET NULL -- Si el dispositivo se borra, la mascota no se borra, solo se desvincula.
);

-- Tabla de eventos del dispositivo. Es un log de todo lo que no es una lectura de sensor.
CREATE TABLE device_events (
  id SERIAL PRIMARY KEY,
  device_id VARCHAR(50) NOT NULL, -- Referencia por el ID de MQTT, no por FK.
  event_type device_event_type NOT NULL,
  payload JSONB, -- Para guardar datos adicionales del evento si es necesario (ej: detalles de un error).
  ts TIMESTAMPTZ DEFAULT NOW()
);

-- Tabla de lecturas de sensores. Optimizada para un alto volumen de escritura (time-series data).
CREATE TABLE sensor_readings (
    ts TIMESTAMPTZ NOT NULL, -- Timestamp enviado por el dispositivo (o generado al recibir si no está disponible).
    received_at TIMESTAMPTZ DEFAULT NOW(), -- Timestamp de cuando el servidor recibe el dato. Para auditoría y latencia.
    device_id VARCHAR(50) NOT NULL, -- Referencia por el ID de MQTT, no por FK.
    temperature_celsius NUMERIC(5, 2),
    humidity_percent NUMERIC(5, 2),
    light_lux INT,
    weight_grams NUMERIC(8, 2),
    PRIMARY KEY (device_id, ts) -- Clave primaria compuesta para asegurar una única lectura por dispositivo y timestamp.
);

-- --- Índices para optimizar el rendimiento de las consultas ---

-- Índices en tablas de identidad
CREATE INDEX idx_users_auth_user_id ON users(auth_user_id);
CREATE INDEX idx_devices_user_id ON devices(user_id);
CREATE INDEX idx_pets_user_id ON pets(user_id);

-- Índices para las tablas de series temporales (las más importantes)
-- Permiten búsquedas rápidas de eventos por dispositivo y fecha.
CREATE INDEX idx_device_events_device_id_ts_desc ON device_events(device_id, ts DESC);

-- Permiten búsquedas rápidas de lecturas por dispositivo y fecha.
CREATE INDEX idx_sensor_readings_device_id_ts_desc ON sensor_readings(device_id, ts DESC);

-- Opcional: Si el volumen de datos crece masivamente, considera usar TimescaleDB y crear hypertables.
-- Ejemplo: SELECT create_hypertable('sensor_readings', 'ts');
-- Ejemplo: SELECT create_hypertable('device_events', 'ts');