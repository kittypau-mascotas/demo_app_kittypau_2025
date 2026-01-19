import { useState } from 'react';
import { useLocation, useSearch } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Logo } from '@/components/ui/Logo';
import { useToast } from '@/hooks/use-toast';
import { authService } from '@/services/api';
import { Loader2 } from 'lucide-react';

export default function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [, setLocation] = useLocation();
  const search = useSearch();
  const { toast } = useToast();

  const params = new URLSearchParams(search);
  const token = params.get('token');

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!token) {
      toast({
        title: 'Error',
        description: 'Token de restablecimiento no válido o faltante.',
        variant: 'destructive',
      });
      return;
    }

    if (password !== confirmPassword) {
      toast({
        title: 'Error',
        description: 'Las contraseñas no coinciden.',
        variant: 'destructive',
      });
      return;
    }

    if (password.length < 6) {
       toast({
        title: 'Error',
        description: 'La contraseña debe tener al menos 6 caracteres.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    try {
      await authService.resetPassword({ token, password });
      toast({
        title: 'Contraseña restablecida',
        description: 'Tu contraseña ha sido actualizada. Ahora puedes iniciar sesión.',
      });
      setLocation('/login');
    } catch (error: any) {
      console.error("Reset password error:", error);
      toast({
        title: 'Error',
        description: error.response?.data?.error || error.message || 'Ocurrió un error al restablecer la contraseña.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-pink-50 dark:bg-gray-900">
      <Card className="mx-auto max-w-sm">
        <CardHeader className="space-y-1 text-center">
          <Logo className="w-24 h-24 mx-auto" />
          <CardTitle className="text-2xl font-bold">Restablecer Contraseña</CardTitle>
          <CardDescription>Ingresa tu nueva contraseña</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleResetPassword} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password">Nueva Contraseña</Label>
              <Input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirmar Contraseña</Label>
              <Input id="confirmPassword" type="password" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            </div>
            <Button type="submit" className="w-full bg-pink-500 hover:bg-pink-600 text-white" disabled={isLoading || !token}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Cambiar Contraseña
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}