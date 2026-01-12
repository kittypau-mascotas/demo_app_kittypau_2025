☁️ AWS IoT Core
Políticas (concepto)

El certificado de KPCL0033 debe permitir:

iot:Publish

KPCL0033/sensors
KPCL0033/status


iot:Subscribe

KPCL0033/cmd


👉 El dispositivo no puede publicar en otros tópicos.

🖥️ BRIDGE EC2 (EL TRADUCTOR)

El bridge es el adaptador entre IoT crudo y sistema web

El bridge DEBE:

Suscribirse a:

+/sensors
+/status


Extraer el deviceId del tópico:

const deviceId = topic.split('/')[0]; // KPCL0033

🔄 NORMALIZACIÓN (OBLIGATORIA)

El bridge convierte esto:

{
  "weight":3122806,
  "temp":666.2,
  "hum":1075.3,
  "ldr":42
}


En esto (formato DB):

{
  device_uid: "KPCL0033",
  weight: 3122806,
  temp: 666.2,
  hum: 1075.3,
  light: 42,
  timestamp: new Date()
}


📌 El ESP NO sabe de DB
📌 El bridge sí

Status

Si recibe:

Online


Inserta (si existe la tabla):

device_events (device_id, type, value, created_at)


O simplemente:

actualiza devices.last_seen

marca devices.online = true