import { WebSocketServer, WebSocket } from 'ws';
import * as http from 'http';

interface CustomWebSocket extends WebSocket {
  isAlive: boolean;
}

let wss: WebSocketServer | null = null;
const clients: Set<CustomWebSocket> = new Set(); // To keep track of connected clients

export function initializeWebSocketServer(server: http.Server) {
  wss = new WebSocketServer({ server });

  wss.on('connection', (ws: CustomWebSocket) => {
    ws.isAlive = true;
    clients.add(ws);
    console.log('Cliente WebSocket conectado. Total clientes:', clients.size);

    ws.on('pong', () => {
      ws.isAlive = true;
    });

    ws.on('message', (message: string) => {
      console.log('Mensaje recibido vía WebSocket:', message);
      // Aquí se podría añadir lógica para manejar comandos o solicitudes del frontend
      // Por ahora, simplemente reenvía el mensaje a todos los demás clientes (opcional)
      // clients.forEach(client => {
      //   if (client !== ws && client.readyState === WebSocket.OPEN) {
      //     client.send(message);
      //   }
      // });
    });

    ws.on('close', () => {
      clients.delete(ws);
      console.log('Cliente WebSocket desconectado. Total clientes:', clients.size);
    });

    ws.on('error', (error) => {
      console.error('Error en WebSocket:', error);
    });
  });

  // Keep-alive pings to detect disconnected clients
  const interval = setInterval(() => {
    if (wss) {
      clients.forEach((ws: CustomWebSocket) => {
        if (ws.readyState === WebSocket.OPEN) {
          if (!ws.isAlive) {
            console.warn('Cliente WebSocket inactivo, terminando conexión.');
            return ws.terminate();
          }
          ws.isAlive = false;
          ws.ping();
        } else if (ws.readyState === WebSocket.CLOSED) {
            clients.delete(ws); // Clean up clients that are already closed
        }
      });
    }
  }, 30000); // Ping every 30 seconds

  wss.on('close', () => {
    clearInterval(interval);
  });

  console.log('Servidor WebSocket inicializado.');
}

/**
 * Broadcasts a message to all connected WebSocket clients.
 * @param eventType A string identifying the type of event (e.g., 'sensorData', 'deviceHealth')
 * @param payload The data to send.
 */
export function broadcast(eventType: string, payload: any) {
  const message = JSON.stringify({ event: eventType, data: payload });
  clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });
}

/**
 * Emits a message to a specific client or group of clients based on a target (e.g., deviceId).
 * This is a placeholder for more advanced targeting.
 * @param targetIdentifier
 * @param eventType
 * @param payload
 */
export function emitToTarget(targetIdentifier: string, eventType: string, payload: any) {
  // Implement logic to find specific clients (e.g., by deviceId associated with their session)
  // For now, this is just a placeholder, but it could be used if client connections are
  // mapped to device IDs.
  console.warn(`emitToTarget no implementado: ${targetIdentifier}, ${eventType}, ${JSON.stringify(payload)}`);
  // If no specific targeting, fallback to broadcast for now
  broadcast(eventType, payload);
}
