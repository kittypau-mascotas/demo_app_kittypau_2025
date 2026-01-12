🆔 Identidad del dispositivo

deviceId: KPCL0033

Regla:

Cada dispositivo KittyPau tendrá un ID único

Ese ID rige todo: tópicos, DB, ownership, dashboard

📡 MQTT – BROKER

AWS IoT Core

Endpoint:

a3o1jhmmwxnm4z-ats.iot.us-east-2.amazonaws.com


Autenticación:

Certificados X.509 cargados en el dispositivo

Ruta local:

C:\Kittypau\3\Things\KPCL0033

📤 TÓPICOS QUE PUBLICA EL DISPOSITIVO (NO SE CAMBIAN)
1️⃣ Sensores

Tópico

KPCL0033/sensors


Payload

{
  "weight": 3122806.00,
  "temp": 666.20,
  "hum": 1075.30,
  "ldr": 42
}


📌 Observaciones:

No incluye timestamp

Usa ldr (no light)

Valores pueden venir “crudos” (sin normalizar)

👉 Esto es correcto para un dispositivo embebido

2️⃣ Estado

Tópico

KPCL0033/status


Payload

Online


o

OK


📌 Observaciones:

NO es JSON

Es un string plano

El dispositivo debe iniciar aunque un sensor falle

3️⃣ Comandos (suscripción)

Tópico

KPCL0033/cmd


Ejemplo

ADDWIFI:MiNuevaRed,MiContraseñaSuperSecreta


📌 Requisitos:

Usar LittleFS para guardar redes conocidas

Permitir múltiples SSID

Reconectar automáticamente si una red está disponible

📶 WiFi del dispositivo

SSID inicial:

Jeivos


PASS:

jdayne212


📌 Luego se podrán agregar más por MQTT (KPCL0033/cmd)

🔑 DECISIÓN ARQUITECTÓNICA CLAVE (MUY IMPORTANTE)

❌ NO VAMOS A CAMBIAR LOS TÓPICOS NI PAYLOADS DEL ESP
✅ VAMOS A ADAPTAR TODO LO DEMÁS A ESTO

Esto es la decisión correcta en IoT.