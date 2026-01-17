import React from 'react';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from 'next-themes';
import { TooltipProvider } from '@/components/ui/tooltip';
import { WebSocketProvider } from '@/hooks/use-websocket';
import AppRouter from './router'; // Import the new router component
import ErrorBoundary from '@/components/ErrorBoundary'; // Import ErrorBoundary

function App() {
  return (
    <ErrorBoundary> {/* Wrap the entire app with ErrorBoundary */}
      <ThemeProvider defaultTheme="system" attribute="class" enableSystem>
        <TooltipProvider>
          <WebSocketProvider url={import.meta.env.VITE_WS_URL}>
            <AppRouter /> {/* Use the new AppRouter component */}
            <Toaster />
          </WebSocketProvider>
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
