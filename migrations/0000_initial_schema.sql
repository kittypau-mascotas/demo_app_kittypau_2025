-- Migración Inicial basada en ARQUITECTURA_GENERAL.md

-- Habilitar extensiones necesarias para UUIDs
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Tabla users
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  name TEXT,
  password_hash TEXT NOT NULL, -- Gestionado por auth
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla devices
CREATE TABLE IF NOT EXISTS devices (
  id SERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  device_id TEXT NOT NULL UNIQUE, -- ID físico (ej. KPCL0001)
  name TEXT NOT NULL,
  device_type TEXT,
  firmware_version TEXT,
  last_seen TIMESTAMP WITH TIME ZONE,
  battery_level INTEGER,
  status TEXT DEFAULT 'offline', -- 'active' | 'offline' | 'warning' | 'error'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_devices_user_id ON devices(user_id);

-- Tabla pets
CREATE TABLE IF NOT EXISTS pets (
  id SERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  species TEXT NOT NULL, -- 'Gato' | 'Perro'
  breed TEXT,
  birth_date DATE,
  photo_url TEXT,
  device_id TEXT REFERENCES devices(device_id) ON DELETE SET NULL, -- Vinculación lógica con dispositivo
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_pets_user_id ON pets(user_id);

-- Tabla sensor_readings (Telemetría)
CREATE TABLE IF NOT EXISTS sensor_readings (
  id SERIAL PRIMARY KEY,
  device_id TEXT NOT NULL REFERENCES devices(device_id) ON DELETE CASCADE,
  ts TIMESTAMP WITH TIME ZONE NOT NULL,
  temperature NUMERIC,
  humidity NUMERIC,
  weight_grams NUMERIC,
  battery_level INTEGER,
  activity_level INTEGER, -- Métrica derivada
  UNIQUE(device_id, ts)
);

-- Tabla consumption_events
CREATE TABLE IF NOT EXISTS consumption_events (
  id SERIAL PRIMARY KEY,
  device_id TEXT NOT NULL REFERENCES devices(device_id) ON DELETE CASCADE,
  ts TIMESTAMP WITH TIME ZONE NOT NULL,
  amount_grams NUMERIC,
  duration_seconds INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);