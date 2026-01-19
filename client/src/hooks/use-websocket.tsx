import React, { createContext, useContext, useEffect, useState, useRef } from 'react';

interface WebSocketContextType {
  lastMessage: any;
  sendMessage: (message: any) => void;
  readyState: number;
}

const WebSocketContext = createContext<WebSocketContextType>({
  lastMessage: null,
  sendMessage: () => {},
  readyState: 3, // CLOSED
});

export function WebSocketProvider({ url, children }: { url?: string; children: React.ReactNode }) {
  const [lastMessage, setLastMessage] = useState<any>(null);
  const [readyState, setReadyState] = useState<number>(3);
  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (!url) return;

    try {
      const socket = new WebSocket(url);
      ws.current = socket;

      socket.onopen = () => setReadyState(socket.readyState);
      socket.onclose = () => setReadyState(socket.readyState);
      socket.onerror = (error) => console.error('WebSocket error:', error);
      socket.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          setLastMessage(data);
        } catch {
          setLastMessage(event.data);
        }
      };

      return () => {
        socket.close();
      };
    } catch (error) {
      console.error("Invalid WebSocket URL:", error);
    }
  }, [url]);

  const sendMessage = (message: any) => {
    if (ws.current?.readyState === 1) {
      ws.current.send(JSON.stringify(message));
    }
  };

  return (
    <WebSocketContext.Provider value={{ lastMessage, sendMessage, readyState }}>
      {children}
    </WebSocketContext.Provider>
  );
}

export function useWebSocket() {
  return useContext(WebSocketContext);
}