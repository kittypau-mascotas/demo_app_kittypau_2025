import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';

export default function Settings() {
  const [notifications, setNotifications] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const { toast } = useToast();

  const handleSave = () => {
    console.log('Settings saved', { notifications, emailAlerts, darkMode });
    toast({ title: 'Configuración guardada', description: 'Tus preferencias han sido actualizadas.' });
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6" data-testid="page-settings">
      <h1 className="titulo text-3xl">Configuración</h1>

      <Card>
        <CardHeader>
          <CardTitle>Perfil</CardTitle>
          <CardDescription>Actualiza tu información personal</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nombre</Label>
            <Input id="name" defaultValue="Usuario KittyPau" data-testid="input-name" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Correo Electrónico</Label>
            <Input id="email" type="email" defaultValue="usuario@kittypau.com" data-testid="input-email" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Notificaciones</CardTitle>
          <CardDescription>Gestiona cómo recibes alertas</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="notifications">Notificaciones Push</Label>
              <p className="text-sm text-muted-foreground">Recibe notificaciones en tiempo real</p>
            </div>
            <Switch
              id="notifications"
              checked={notifications}
              onCheckedChange={setNotifications}
              data-testid="switch-notifications"
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="emailAlerts">Alertas por Email</Label>
              <p className="text-sm text-muted-foreground">Recibe resumen diario por correo</p>
            </div>
            <Switch
              id="emailAlerts"
              checked={emailAlerts}
              onCheckedChange={setEmailAlerts}
              data-testid="switch-email-alerts"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Apariencia</CardTitle>
          <CardDescription>Personaliza la interfaz</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="darkMode">Modo Oscuro</Label>
              <p className="text-sm text-muted-foreground">Cambia al tema oscuro</p>
            </div>
            <Switch
              id="darkMode"
              checked={darkMode}
              onCheckedChange={setDarkMode}
              data-testid="switch-dark-mode"
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button className="btn-primary" onClick={handleSave} data-testid="button-save-settings">
          Guardar Cambios
        </Button>
      </div>
    </div>
  );
}
