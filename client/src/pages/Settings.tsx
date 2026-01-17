import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'; // Add Select components
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch'; // Add Switch component
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { Link } from 'wouter'; // For linking to other sections if needed
import { Loader2 } from 'lucide-react';
import { logger } from '@/lib/logger'; // Import logger

// Assuming a hook to fetch active sessions, similar to useQuery
const useActiveSessions = () => {
  // This would typically fetch from GET /api/auth/sessions
  // For now, returning mock data
  return {
    data: [
      { id: '1', location: 'Santiago', ip: '192.168.1.1', lastActive: '2 hours ago' },
      { id: '2', location: 'Valparaíso', ip: '192.168.1.2', lastActive: '1 day ago' },
    ],
    isLoading: false,
    isError: false,
  };
};

export default function Settings() {
  const { session } = useAuth();
  const { toast } = useToast();
  const { data: activeSessions, isLoading: isLoadingSessions } = useActiveSessions();

  // Change Password State
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmNewPassword) {
      toast({
        title: 'Error al cambiar contraseña',
        description: 'Las nuevas contraseñas no coinciden.',
        variant: 'destructive',
      });
      return;
    }

    setIsChangingPassword(true);
    try {
      // Assuming a backend endpoint for changing password
      const response = await fetch('/api/auth/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error desconocido al cambiar la contraseña.');
      }

      toast({ title: '¡Contraseña cambiada!', description: 'Tu contraseña ha sido actualizada exitosamente.' });
      setCurrentPassword('');
      setNewPassword('');
      setConfirmNewPassword('');
    } catch (err: any) {
      logger.error('Failed to change password:', { context: 'Settings Page', payload: err });
      toast({
        title: 'Error',
        description: err.message || 'No se pudo cambiar la contraseña.',
        variant: 'destructive',
      });
    } finally {
      setIsChangingPassword(false);
    }
  };

  return (
    <div className="p-6 lg:p-8 space-y-8 max-w-screen-2xl mx-auto">
      <h2 className="text-4xl font-bold titulo">Configuración</h2>

      {/* Account Section */}
      <Card>
        <CardHeader>
          <CardTitle>Cuenta</CardTitle>
          <CardDescription>Gestiona la configuración de tu cuenta.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={session?.user?.email || ''} disabled readOnly />
          </div>

          <Separator />

          {/* Change Password */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Cambiar Contraseña</h3>
            <form onSubmit={handleChangePassword} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Contraseña Actual</Label>
                <Input
                  id="current-password"
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  required
                  disabled={isChangingPassword}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-password">Nueva Contraseña</Label>
                <Input
                  id="new-password"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  disabled={isChangingPassword}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-new-password">Confirmar Nueva Contraseña</Label>
                <Input
                  id="confirm-new-password"
                  type="password"
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  required
                  disabled={isChangingPassword}
                />
              </div>
              <Button type="submit" className="btn-primary" disabled={isChangingPassword}>
                {isChangingPassword ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Cambiando...
                  </>
                ) : (
                  'Cambiar Contraseña'
                )}
              </Button>
            </form>
          </div>

          <Separator />

          {/* Active Sessions */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Sesiones Activas</h3>
            {isLoadingSessions ? (
              <p className="text-muted-foreground">Cargando sesiones...</p>
            ) : activeSessions && activeSessions.length > 0 ? (
              <div className="space-y-2">
                {activeSessions.map(session => (
                  <div key={session.id} className="border p-3 rounded-md">
                    <p className="font-medium">{session.location} ({session.ip})</p>
                    <p className="text-sm text-muted-foreground">Última actividad: {session.lastActive}</p>
                    {/* Add a button to revoke session if needed */}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">No hay sesiones activas.</p>
            )}
          </div>

        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Preferencias</CardTitle>
          <CardDescription>Ajusta cómo se ve y se siente la aplicación.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Text Size Control */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Tamaño del Texto</h3>
            <p className="text-muted-foreground text-sm">Ajusta el tamaño base de la fuente de la aplicación.</p>
            {/* Placeholder for actual text size control (e.g., a slider or select) */}
            <Select defaultValue="medium">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Seleccionar tamaño" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="small">Pequeño</SelectItem>
                <SelectItem value="medium">Mediano</SelectItem>
                <SelectItem value="large">Grande</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Separator />

          {/* Animations Toggle */}
          <div className="flex items-center justify-between space-x-4">
            <div className="space-y-0.5">
              <h3 className="text-lg font-semibold">Animaciones</h3>
              <CardDescription>Activa o desactiva las animaciones de la interfaz.</CardDescription>
            </div>
            {/* Placeholder for actual toggle */}
            <Switch checked={true} onCheckedChange={() => console.log('Toggle animations')} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Privacidad</CardTitle>
          <CardDescription>Gestiona tus datos y cuenta de KittyPau.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Export Data */}
          <div className="flex items-center justify-between space-x-4">
            <div className="space-y-0.5">
              <h3 className="text-lg font-semibold">Exportar Datos</h3>
              <CardDescription>Descarga una copia de todos tus datos de KittyPau.</CardDescription>
            </div>
            <Button variant="outline" onClick={() => window.open('/api/user/export-data', '_blank')}>
              Exportar
            </Button>
          </div>

          <Separator />

          {/* Delete Account */}
          <div className="flex items-center justify-between space-x-4">
            <div className="space-y-0.5">
              <h3 className="text-lg font-semibold text-red-600">Eliminar Cuenta</h3>
              <CardDescription>Elimina permanentemente tu cuenta y todos los datos asociados.</CardDescription>
            </div>
            <Button variant="destructive" onClick={() => console.log('Open delete account confirmation dialog')}>
              Eliminar Cuenta
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Soporte</CardTitle>
          <CardDescription>Encuentra respuestas a tus preguntas y contáctanos.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between space-x-4">
            <div className="space-y-0.5">
              <h3 className="text-lg font-semibold">Preguntas Frecuentes (FAQ)</h3>
              <CardDescription>Encuentra respuestas a las preguntas más comunes.</CardDescription>
            </div>
            <Link href="/faq"> {/* Assuming a /faq route */}
              <Button variant="outline">Ver FAQ</Button>
            </Link>
          </div>

          <Separator />

          <div className="flex items-center justify-between space-x-4">
            <div className="space-y-0.5">
              <h3 className="text-lg font-semibold">Contactar Soporte</h3>
              <CardDescription>Envíanos un mensaje y te ayudaremos.</CardDescription>
            </div>
            <Link href="/contact"> {/* Assuming a /contact route */}
              <Button variant="outline">Contactar</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
