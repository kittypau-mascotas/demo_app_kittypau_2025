import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from './ui/card';
import { Button } from './ui/button';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error, errorInfo: null };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // You can also log the error to an error reporting service
    console.error("ErrorBoundary caught an error:", error, errorInfo);
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-background text-foreground">
          <Card className="max-w-md text-center">
            <CardHeader>
              <CardTitle className="text-red-500 text-3xl">¡Oh no! Algo salió mal. 🐾</CardTitle>
              <CardDescription>
                Parece que la aplicación encontró un problema inesperado.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Hemos sido notificados del error y estamos trabajando para solucionarlo.
              </p>
              <Button onClick={() => window.location.reload()} className="btn-primary">
                Recargar la página
              </Button>
              {this.state.error && (
                <details className="mt-4 text-sm text-left text-gray-600 dark:text-gray-400">
                  <summary>Detalles del Error</summary>
                  <pre className="whitespace-pre-wrap break-all p-2 bg-gray-100 dark:bg-gray-800 rounded-md mt-2">
                    {this.state.error.toString()}
                    <br />
                    {this.state.errorInfo?.componentStack}
                  </pre>
                </details>
              )}
            </CardContent>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
