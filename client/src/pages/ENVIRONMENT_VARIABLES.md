# Variables de Entorno

Lista de variables requeridas para el funcionamiento de la aplicación.

## Backend (API & Auth)

| Variable | Descripción | Requerido |
| :--- | :--- | :---: |
| `DATABASE_URL` | Conexión PostgreSQL (Neon). | Sí |
| `AUTH_SECRET` | Clave secreta para cifrado de sesiones. | Sí |
| `BETTER_AUTH_URL` | URL base de la aplicación (producción). | Sí (Prod) |

## Frontend (Vite)

| Variable | Descripción | Requerido |
| :--- | :--- | :---: |
| `VITE_API_URL` | URL base de la API (si es diferente al origen). | No |

## Bridge (EC2 - Solo Worker)

| Variable | Descripción | Requerido |
| :--- | :--- | :---: |
| `AWS_IOT_ENDPOINT` | Endpoint MQTT de AWS. | Sí |
| `AWS_IOT_*_PATH` | Rutas a certificados X.509. | Sí |