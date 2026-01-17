import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Link, useLocation } from 'wouter';
import { Loader2 } from 'lucide-react';

export default function AddDevice() {
  const [deviceId, setDeviceId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const [, setLocation] = useLocation();

  const handleRegisterDevice = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Assuming a backend endpoint for device registration/pairing
      const response = await fetch('/api/devices', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ deviceId }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error desconocido al registrar el dispositivo.');
      }

      toast({ title: '¡Dispositivo registrado!', description: `El dispositivo ${deviceId} ha sido añadido.` });
      setLocation('/devices'); // Redirect to devices list after successful registration
    } catch (err: any) {
      toast({
        title: 'Error',
        description: err.message || 'No se pudo registrar el dispositivo.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-pink-50 dark:bg-gray-900 p-4">
      <Card className="mx-auto max-w-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl">Registrar Nuevo Dispositivo</CardTitle>
          <CardDescription>Ingresa el ID de tu dispositivo KittyPau para vincularlo.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleRegisterDevice} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="deviceId">ID del Dispositivo</Label>
              <Input
                id="deviceId"
                value={deviceId}
                onChange={(e) => setDeviceId(e.target.value)}
                placeholder="Ej: KPCL0001"
                required
                disabled={isLoading}
              />
            </div>
            <Button type="submit" className="w-full btn-primary" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Registrando...
                </>
              ) : (
                'Registrar Dispositivo'
              )}
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            <Link href="/devices" className="text-primary hover:underline">
              Volver a la lista de dispositivos
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
