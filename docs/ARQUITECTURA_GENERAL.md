# Arquitectura General del Proyecto KittyPau

Este documento describe la arquitectura técnica integral de la plataforma KittyPau, desde el dispositivo físico de hardware hasta la interfaz de usuario final.

## Flujo de Datos End-to-End

El sistema KittyPau está diseñado como una plataforma IoT desacoplada y escalable que sigue el siguiente flujo de información:

1.  **Dispositivo IoT (Hardware)**: Un microcontrolador (como ESP8266 o ESP32) equipado con sensores captura datos del entorno o del comportamiento de la mascota. Este dispositivo se conecta de forma segura a la nube de AWS.
    
2.  **AWS IoT Core (Ingesta de Datos)**: Actúa como el *message broker* en la nube. Los dispositivos se autentican mediante certificados de seguridad X.509 únicos y publican telemetría en *topics* MQTT específicos para cada dispositivo (`kittypau/{deviceId}/telemetry`).
    
3.  **Bridge MQTT (Procesamiento en EC2)**: Un servicio persistente de Node.js, alojado en una instancia de AWS EC2, se suscribe a los *topics* de AWS IoT Core. Su función es crucial:
    *   **Escuchar** de forma continua los mensajes MQTT.
    *   **Validar y normalizar** los datos recibidos.
    *   **Enriquecer** los datos con información adicional (ej. timestamps, IDs).
    *   **Persistir** la información procesada en la base de datos PostgreSQL.
    
4.  **Neon Database (Almacenamiento)**: Una base de datos PostgreSQL Serverless que almacena todos los datos de la plataforma. Está diseñada con un modelo multi-tenant, asegurando que los datos de un usuario solo sean accesibles por ese usuario.
    
5.  **Backend API (Lógica de Negocio)**: Un conjunto de Vercel Serverless Functions escritas en TypeScript. Exponen una API RESTful que el frontend consume. Estas funciones se conectan a la base de datos Neon para leer o modificar datos, siempre aplicando estrictas reglas de negocio y seguridad.
    
6.  **Frontend Web (Interfaz de Usuario)**: Una aplicación de página única (SPA) desarrollada con Vite y React. Se despliega en Vercel y se sirve globalmente a través de su CDN. Los usuarios interactúan con esta interfaz para ver los datos de sus mascotas, gestionar dispositivos y configurar alertas.
    
7.  **Usuario Autenticado**: El usuario final que accede a la plataforma a través de un navegador web. La autenticación se gestiona a través de un sistema de cookies seguras y rutas protegidas en el frontend.

## Diagrama Conceptual

```
┌───────────────┐      ┌────────────────┐      ┌────────────────┐
│ Dispositivo IoT │──────│ AWS IoT Core   │──────│ Bridge MQTT    │
│ (ESP32)       │─MQTT─>│ (Certificados) │─MQTT─>│ (Node.js/EC2)  │
└───────────────┘      └────────────────┘      └────────────────┘
                                                        │
                                                        │ SQL
                                                        ▼
┌───────────────┐      ┌────────────────┐      ┌────────────────┐
│ Usuario Final │<───┐  │ Frontend       │<───┐  │ Neon DB        │
│ (Navegador)   │    │  │ (React/Vercel) │    │  │ (PostgreSQL)   │
└───────────────┘    │  └────────────────┘    │  └────────────────┘
      ▲              │          ▲             │          ▲
      │ HTTPS          │          │ HTTPS         │          │
      └──────────────┴──────────┴─────────────┴──────────┘
                                │
                      ┌────────────────┐
                      │ Backend API    │
                      │ (Vercel Funcs) │
                      └────────────────┘
```
