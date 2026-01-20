# Claves y Certificados del Proyecto KittyPau

Este documento unifica todas las credenciales, claves, certificados, usuarios y variables de entorno identificadas en el proyecto. Es crucial mantener esta información segura y actualizada.

## 1. Detalles de Instancia AWS EC2 (kittypau-iot-bridge)

*   **Nombre de Instancia:** `kittypau-iot-bridge`
*   **ID de Instancia:** `i-06d9d84a3ebd359c0`
*   **Dirección IPv4 Pública:** `3.135.201.228`
*   **Dirección IPv4 Privada:** `172.31.14.153`
*   **Nombre de Clave (Key Name):** `kittypau-key`
*   **ARN de Instancia:** `arn:aws:ec2:us-east-2:440671981849:instance/i-06d9d84a3ebd359c0`
*   **Rutas de Certificados en la Instancia EC2:**
    *   `/home/ubuntu/kittypau/.env`
    *   `/home/ubuntu/kittypau/certs/cert.pem`
    *   `/home/ubuntu/kittypau/certs/private.key`
    *   `/home/ubuntu/kittypau/certs/AmazonRootCA1.pem`

## 2. Detalles de AWS IoT Core

*   **Objetos/Things de IoT:** `KPCL0034`, `KPCL0033`, `KPCL0031`, `vercel_neon_1a`, `KPCL0030`
*   **ARN del Objeto KPCL0033:** `arn:aws:iot:us-east-2:440671981849:thing/KPCL0033`
*   **ID de Certificado:** `ec9ff0aa19e27f9e836d69fec5049bf75c6ea6503c486fb92c2e9e4d0cffff4f`
*   **ARN de Certificado:** `arn:aws:iot:us-east-2:440671981849:cert/ec9ff0aa19e27f9e836d69fec5049bf75c6ea6503c486fb92c2e9e4d0cffff4f`
*   **Nombre de Política:** `KPCL_Pol1a`
*   **ARN de Política:** `arn:aws:iot:us-east-2:440671981849:policy/KPCL_Pol1a`
*   **JSON de Política:**
    ```json
    {
      "Version": "2012-10-17",
      "Statement": [
        {
          "Effect": "Allow",
          "Action": "iot:Connect",
          "Resource": "arn:aws:iot:us-east-2:440671981849:client/${iot:ClientId}"
        },
        {
          "Effect": "Allow",
          "Action": "iot:Publish",
          "Resource": "arn:aws:iot:us-east-2:440671981849:topic/kittypau/${iot:ClientId}/data"
        },
        {
          "Effect": "Allow",
          "Action": ["iot:Subscribe", "iot:Receive"],
          "Resource": [
            "arn:aws:iot:us-east-2:440671981849:topicfilter/kittypau/${iot:ClientId}/command",
            "arn:aws:iot:us-east-2:440671981849:topic/kittypau/${iot:ClientId}/command"
          ]
        }
      ]
    }
    ```
*   **Endpoint de AWS IoT (desde Vercel):** `a3o1jhmmwxnm4z-ats.iot.us-east-2.amazonaws.com`

## 3. Despliegue en Vercel y Variables de Entorno

*   **ID de Proyecto Vercel:** `prj_KfVBEUccD3vKPdIO8Vc4zFi1fKIY`
*   **Variables de Entorno (con valores, donde disponibles):**
    *   `BETTER_AUTH_URL`: `https://demo-app-kittypau-2025.vercel.app`
    *   `NEON_AUTH_URL` (desde Vercel): `https://ep-polished-art-adllyxom.neonauth.c-2.us-east-1.aws.neon.tech`
    *   `AUTH_SECRET`: `kittypau.mascotas@gmail.com`
    *   `VITE_NEON_AUTH_URL` (desde Vercel): `https://ep-polished-art-adllyxom.neonauth.c-2.us-east-1.aws.neon.tech/neondb/auth`
    *   **`AWS_IOT_CA` (Certificado CA de AWS IoT):**
        ```
        -----BEGIN CERTIFICATE-----
        MIIDQTCCAimgAwIBAgITBmyfz5m/jAo54vB4ikPmljZbyjANBgkqhkiG9w0BAQsF
        ADA5MQswCQYDVQQGEwJVUzEPMA0GA1UEChMGQW1hem9uMRkwFwYDVQQDExBBbWF6
        b24gUm9vdCBDQSAxMB4XDTE1MDUyNjAwMDAwMFoXDTM4MDExNzAwMDAwMFowOTEL
        MAkGA1UEBhMCVVMxDzANBgNVBAoTBkFtYXpvbjEZMBcGA1UEAxMQQW1hem9uIFJv
        b3QgQ0EgMTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBALJ4gHHKeNXj
        ca9HgFB0fW7Y14h29Jlo91ghYPl0hAEvrAIthtOgQ3pOsqTQNroBvo3bSMgHFzZM
        9O6II8c+6zf1tRn4SWiw3te5djgdYZ6k/oI2peVKVuRF4fn9tBb6dNqcmzU5L/qw
        IFAGbHrQgLKm+a/sRxmPUDgH3KKHOVj4utWp+UhnMJbulHheb4mjUcAwhmahRWa6
        VOujw5H5SNz/0egwLX0tdHA114gk957EWW67c4cX8jJGKLhD+rcdqsq08p8kDi1L
        93FcXmn/6pUCyziKrlA4b9v7LWIbxcceVOF34GfID5yHI9Y/QCB/IIDEgEw+OyQm
        jgSubJrIqg0CAwEAAaNCMEAwDwYDVR0TAQH/BAUwAwEB/zAOBgNVHQ8BAf8EBAMC
        AYYwHQYDVR0OBBYEFIQYzIU07LwMlJQuCFmcx7IQTgoIMA0GCSqGSIb3DQEBCwUA
        A4IBAQCY8jdaQZChGsV2USggNiMOruYou6r4lK5IpDB/G/wkjUu0yKGX9rbxenDI
        U5PMCCjjmCXPI6T53iHTfIUJrU6adTrCC2qJeHZERxhlbI1Bjjt/msv0tadQ1wUs
        N+gDS63pYaACbvXy8MWy7Vu33PqUXHeeE6V/Uq2V8viTO96LXFvKWlJbYK8U90vv
        o/ufQJVtMVT8QtPHRh8jrdkPSHCa2XV4cdFyQzR1bldZwgJcJmApzyMZFo6IQ6XU
        5MsI+yMRQ+hDKXJioaldXgjUkK642M4UwtBV8ob2xJNDd2ZhwLnoQdeXeGADbkpy
        rqXRfboQnoZsG4q5WTP468SQvvG5
        -----END CERTIFICATE-----
        ```
    *   **`AWS_IOT_PRIVATE_KEY` (Clave Privada de AWS IoT):**
        ```
        -----BEGIN RSA PRIVATE KEY-----
        MIIEogIBAAKCAQEA06Q+3zd4e//sl+VT/gYmAgAv6Aa+PGv4rV1tEl3cNe2TRik3
        LhtFdEs7NMMW/9j5ZQtzEsrGuDq5p475m/Yz2rD3xHss7pdjsl4tZDX63S41HtFy
        BmnZ7IFAQG8bTPIjtxSgx1efgg2gbGXFgo90yrDSzHUIBP2kriWr3TIYvltyf3yv
        CoBXWbZZbwtmYJpNxEchYl4ORJB3MQzNrhjKj+wKJJ0HmODKIjmzT4Hn9/IwyVDo
        BFPlUiQpqp7R34wzzh4zScm964/fvbhcd+QxOrBI+0ytyvehA8m580ZGmvxw8V2A
        gCrGam6TNOx/ci1YYdygvceoNukuyUv/Avf8owIDAQABAoIBAC5K69GpcXo2BYtI
        BzI2KBQh9FidOPlAaLmLCPOOgj9tgtxC4aX9IxkH56Bn190ImayHb5k5r3PWrItB
        E8oQdVEtilR42OArTwxR2z3jLMc6dzYRfA55EsjPkL1HUEJpaHSAV5aizOoGjwOG
        00f2lwZK3SEJrEJjNKU+6jPM5Gqmcfz1BqEyLKaT62Qb5fxVDWIIakCQs/ebZPLP
        2vzAmV+O/ct3v1K7VOAdjZ17qFsN2Z3F+G5PpeERVq5tJRiz+m9RUw+OWKU7epXu
        zJ469f8ddtZJh0b1hyXNYUJHCsxLJnKyo4u4EX4Byq3siXdfQsLnj4gMAkc7bPXx
        q++2ctECgYEA+K2KcqPbX6EHsBazbgiLwgZ7c2MxPNr8mxT9n08Hg3U2Zhk+YWde
        K+MqSsxPVaSpGjRy1rvpR9QFBLkU0U9BJq1XsPtZ1dXCpm/tbEPLg6Cbv8nbS6F4
        vX/JD3pEYb9dMcMLB5o7Dwkdbijg7ANuShwok9LFZgMNS2b0YOfwhHkCgYEA2d+J
        RY7vucHZ7tTiA4Tqmh2pvl+OvnD26Q2iGw463iFBzhMqBjWbIHrFX0dwQeDhiIZW
        je3tNc/bCXHPYNdHZ9x4rOaZ5+oCuxdfEFSI5W0D6R1vWvlsorOfGryUAoznOIEu
        +7jsGuvkm2ZQxSt6h9353nUdruuOPItjLJKsavsCgYBHQKI8uspumhszzy1WR8iT
        rXvN0gwXnb9nSBprfR9wATO3CWCgVBfdh1dk2ymYJnf1dDW7ZVgwJoXRlp5qYsUO
        KfjIUxyocnk1aziiHsK/UlOOHm5hO0D3OxgHAUd6onQ3f+U3Jm/pnPj7yWa4+Tqu
        rWbLBEdfNVyn0DYRViPKMQKBgEFJAGM9f4wUEG/GjqsrSvk/ZjvLeoSKaRJQqYCd
        9PnW0Vck2vTdX0yOPVJdn7+92RcF2i3RW8FCNYpQ9ik4mQcAQ5Db0MZzkrnpOO01
        x4en8QILdfC2yNzAIi7qzxcsjaSa4S9ArE8s3GXMdOuAKclItLT6NxjRMN/njKIw
        mUW9AoGAMOpm3d83c9erk/3ANp7ZqXlbBfvOnCLxNIa7Dyfc/Ic9c98arL6LXaaw
        ykN2E5Ika3cvwXuxRiL86z3+uhIz87tg42fe/k8hnhhmLsURjbuN7dGjHtS2MURs
        4h1bcKctLRMzwYJauu7AQ/gOatqtIaIZHx/offSDeiYUkVJG4UE=
        -----END RSA PRIVATE KEY-----
        ```
    *   **`AWS_IOT_CERT` (Certificado de Dispositivo AWS IoT):**
        ```
        -----BEGIN CERTIFICATE-----
        MIIDWTCCAkGgAwIBAgIUSsbfjx/tXTaBS4cT/+fBkitgR+0wDQYJKoZIhvcNAQEL
        BQAwTTFLMEkGA1UECwxCQW1hem9uIFdlYiBTZXJ2aWNlcyBPPUFtYXpvbi5jb20g
        SW5jLiBMPVNlYXR0bGUgU1Q9V2FzaGluZ3RvbiBDPVVTMB4XDTI2MDEwNTIzNDcx
        NVoXDTQ5MTIzMTIzNTk1OVowHjEcMBoGA1UEAwwTQVdSIElvVCBDZXJ0aWZpY2F0
        ZTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBANOkPt83eHv/7JflU/4G
        JgIAL+gGvjxr+K1dbRJd3DXtk0YpNy4bRXRLOzTDFv/Y+WULcxLKxrg6uaeO+Zv2
        M9qw98R7LO6XY7JeLWQ1+t0uNR7RcgZp2eyBQEBvG0zyI7cUoMdXn4INoGxlxYKP
        dMqw0sx1CAT9pK4lq90yGL5bcn98rwqAV1m2WW8LZmCaTcRHIWJeDkSQdzEMza4Y
        yo/sCiSdB5jgyiI5s0+B5/fyMMlQ6ART5VIkKapO0d+MM84eM0nJveuP3724XHfk
        MTqwSPtMrcr3oQPJufNGRpr8cPFdgIAqxmpukzTsf3ItWGHcoL3HqDbpLslL/wL3
        /KMCAwEAAaNgMF4wHwYDVR0jBBgwFoAUtYStOnbgLcUPge99LC/sqArL4vMwHQYD
        VR0OBBYEFN5lSNWNdyL+Ro8WNr7VhOP4F0/PMAwGA1UdEwEB/wQCMAAwDgYDVR0P
        AQH/BAQDAgeAMA0GCSqGSIb3DQEBCwUAA4IBAQCIO6w/b8bJVLLzKQjO6jlDe61I
        drAp+AqOAsM1joas2o6LDX1nVvL80k2w22WsQhXGSS8GFFa3PO4tvbV8gkzc4hYt
        iuwNDJz9fnBPCcn3gftk9z4wHkg+ZkJNGHnYnmrYQ7wgB+8uzGRP9+IBMQIgRtbS
        mKWktsFRVxt9slmoE58Y3wOfgLTxAE3JW+RIcwanfJ/+fUhfy0gK2pcfNkusoETW
        8EJqvv0pmv4vEGGlWN2+VfK2Cm6fOYob4dN1eYKcbGfMiR3XrNeDuQwjc324KaJM
        3XLuVTteVHG0d9PyXlaDQ750WBOh1SAqdBzdPzk38gkuPEhePOurD7C4IyVN
        -----END CERTIFICATE-----
        ```
    *   **`DATABASE_URL` (Development):** `postgresql://neondb_owner:npg_iVL1xhT6ICwp@ep-polished-art-adllyxom-pooler.c-2.us-east-1.aws.neon.tech/neondb?channel_binding=require&sslmode=require`
    *   **`DATABASE_URL_UNPOOLED` (Development):** `postgresql://neondb_owner:npg_iVL1xhT6ICwp@ep-polished-art-adllyxom.c-2.us-east-1.aws.neon.tech/neondb?channel_binding=require&sslmode=require`
    *   **`DATABASE_URL` (Production):** `postgresql://neondb_owner:npg_iVL1xhT6ICwp@ep-twilight-unit-adjpwtmn-pooler.c-2.us-east-1.aws.neon.tech/neondb?channel_binding=require&sslmode=require`
    *   **`DATABASE_URL_UNPOOLED` (Production):** `postgresql://neondb_owner:npg_iVL1xhT6ICwp@ep-twilight-unit-adjpwtmn.c-2.us-east-1.aws.neon.tech/neondb?channel_binding=require&sslmode=require`

## 4. Detalles de Neon Database

*   **Nombre de Proyecto Neon:** `kittypau_a1`
*   **Usuario de Base de Datos (Owner):** `neondb_owner`
*   **Cadena de Conexión (ejemplo con contraseña):** `postgresql://neondb_owner:npg_iVL1xhT6ICwp@ep-polished-art-adllyxom-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require`
*   **Correo Electrónico de Usuario (Neon Auth):** `kittypau.mascotas@gmail.com`
*   **ID de Usuario (Neon Auth):** `cae561a4-ac62-45f0-9cf4-891f54c42729`

## 5. Variables de Entorno Esperadas (según `.env.example`)

Las siguientes variables son esperadas en el archivo `.env` o configuradas como variables de entorno en los entornos de despliegue.

### Configuración de AWS IoT Core
*   `AWS_IOT_ENDPOINT`: Endpoint de AWS IoT. Ejemplo: `YOUR_AWS_IOT_ENDPOINT-ats.iot.YOUR_AWS_REGION.amazonaws.com`
*   `AWS_REGION`: Región de AWS. Ejemplo: `us-east-1`
*   `AWS_IOT_PRIVATE_KEY_PATH`: Ruta al archivo de clave privada. Ejemplo: `./certs/private.pem.key`
*   `AWS_IOT_CERT_PATH`: Ruta al archivo de certificado del dispositivo. Ejemplo: `./certs/device.pem.crt`
*   `AWS_IOT_ROOT_CA_PATH`: Ruta al certificado Root CA de Amazon. Ejemplo: `./certs/root-CA.pem`
*   `AWS_IOT_PRIVATE_KEY_CONTENT`: Contenido de la clave privada (para despliegue en producción, directamente en variables de entorno).
*   `AWS_IOT_CERT_CONTENT`: Contenido del certificado del dispositivo (para despliegue en producción).
*   `AWS_IOT_ROOT_CA_CONTENT`: Contenido del certificado Root CA de Amazon (para despliegue en producción).

### Configuración de Base de Datos PostgreSQL
*   `DATABASE_URL`: Cadena de conexión a la base de datos PostgreSQL. Ejemplo: `postgresql://[user]:[password]@[neon_hostname]/[db_name]?sslmode=require`

### Configuración Específica del Bridge IoT Backend
*   `PORT`: Puerto para el servidor Node.js. Por defecto: `3000`
*   `MQTT_CLIENT_ID`: ID único para el cliente MQTT del bridge. Ejemplo: `kittypau-iot-bridge-1`
*   `MQTT_SUBSCRIBE_TOPIC`: Patrón de topic MQTT para datos de sensores. Ejemplo: `kittypau/+/data/sensors`
*   `JWT_SECRET`: Secreto para tokens JWT (debe ser una cadena muy fuerte y aleatoria). Ejemplo: `YOUR_VERY_STRONG_AND_RANDOM_SECRET_KEY`
*   `NEON_AUTH_URL`: URL de Neon Auth para comunicación backend. Ejemplo: `https://<your-backend-endpoint>.neonauth.<region>.aws.neon.tech/<db>/auth`

### Configuración de Frontend (Vite/React)
*   `VITE_API_URL`: URL base para llamadas HTTP API desde el frontend. Ejemplo: `http://localhost:3000/api`
*   `VITE_WS_URL`: URL base para conexiones WebSocket desde el frontend. Ejemplo: `ws://localhost:3000/ws`
*   `VITE_NEON_AUTH_URL`: URL de Neon Auth para el frontend. Ejemplo: `https://<your-endpoint>.neonauth.<region>.aws.neon.tech/<db>/auth`

---
**NOTA IMPORTANTE:** Esta información es altamente sensible. Asegúrese de que este archivo no se comparta públicamente ni se incluya en repositorios de control de versiones.
