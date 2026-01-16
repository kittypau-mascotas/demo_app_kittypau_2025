import React from 'react';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from 'next-themes';
import { TooltipProvider } from '@/components/ui/tooltip';
import { WebSocketProvider } from '@/hooks/use-websocket';
import AppRouter from './router'; // Import the new router component

function App() {
  return (
    <ThemeProvider defaultTheme="system" attribute="class" enableSystem>
      <TooltipProvider>
        <WebSocketProvider url={import.meta.env.VITE_WS_URL}>
          <AppRouter /> {/* Use the new AppRouter component */}
          <Toaster />
        </WebSocketProvider>
      </TooltipProvider>
    </ThemeProvider>
  );
}

export default App;
