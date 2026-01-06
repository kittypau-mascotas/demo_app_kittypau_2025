import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useRef,
} from 'react';

// Define the shape of the WebSocket context
interface WebSocketContextType {
  isConnected: boolean;
  messages: MessageEvent<any>[]; // Raw WebSocket messages
  sendJsonMessage: (message: object) => void;
  lastJsonMessage: { event: string; data: any } | null;
  subscribeToEvent: (eventType: string, callback: (data: any) => void) => () => void;
}

const WebSocketContext = createContext<WebSocketContextType | undefined>(undefined);

interface WebSocketProviderProps {
  children: React.ReactNode;
  url: string;
}

export const WebSocketProvider: React.FC<WebSocketProviderProps> = ({ children, url }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState<MessageEvent<any>[]>([]);
  const [lastJsonMessage, setLastJsonMessage] = useState<{ event: string; data: any } | null>(null);
  const ws = useRef<WebSocket | null>(null);
  const eventCallbacks = useRef < Record < string, ((data: any) => void)[] >> ({});

  useEffect(() => {
    if (!url) {
      console.error('WebSocket URL is not provided.');
      return;
    }

    ws.current = new WebSocket(url);

    ws.current.onopen = () => {
      console.log('WebSocket conectado.');
      setIsConnected(true);
    };

    ws.current.onmessage = (event) => {
      setMessages((prev) => [...prev, event]);
      try {
        const jsonMessage = JSON.parse(event.data);
        if (jsonMessage.event && jsonMessage.data) {
          setLastJsonMessage(jsonMessage);
          // Trigger callbacks for specific event types
          if (eventCallbacks.current[jsonMessage.event]) {
            eventCallbacks.current[jsonMessage.event].forEach(callback => callback(jsonMessage.data));
          }
        }
      } catch (error) {
        console.warn('Mensaje WebSocket no es JSON:', event.data);
      }
    };

    ws.current.onclose = () => {
      console.log('WebSocket desconectado.');
      setIsConnected(false);
      // Attempt to reconnect after a delay
      setTimeout(() => {
        console.log('Intentando reconectar WebSocket...');
        // To avoid infinite loops in case of persistent errors,
        // you might want to add a retry count or exponential backoff
        if (!ws.current || ws.current.readyState === WebSocket.CLOSED) {
          ws.current = new WebSocket(url); // Re-create WebSocket
        }
      }, 3000);
    };

    ws.current.onerror = (error) => {
      console.error('Error en WebSocket:', error);
      setIsConnected(false);
    };

    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, [url]);

  const sendJsonMessage = useCallback((message: object) => {
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify(message));
    } else {
      console.warn('WebSocket no está conectado para enviar mensaje:', message);
    }
  }, []);

  const subscribeToEvent = useCallback((eventType: string, callback: (data: any) => void) => {
    if (!eventCallbacks.current[eventType]) {
      eventCallbacks.current[eventType] = [];
    }
    eventCallbacks.current[eventType].push(callback);

    return () => { // Return an unsubscribe function
      eventCallbacks.current[eventType] = eventCallbacks.current[eventType].filter(cb => cb !== callback);
      if (eventCallbacks.current[eventType].length === 0) {
        delete eventCallbacks.current[eventType]; // Clean up if no more listeners
      }
    };
  }, []);

  const value = {
    isConnected,
    messages,
    sendJsonMessage,
    lastJsonMessage,
    subscribeToEvent,
  };

  return (
    <WebSocketContext.Provider value={value}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = () => {
  const context = useContext(WebSocketContext);
  if (context === undefined) {
    throw new Error('useWebSocket must be used within a WebSocketProvider');
  }
  return context;
};
