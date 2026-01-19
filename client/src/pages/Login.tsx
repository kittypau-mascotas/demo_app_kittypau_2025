import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useLocation } from 'wouter';
import { Logo } from '@/components/ui/Logo';
import { useToast } from '@/hooks/use-toast';
import { logger } from '@/lib/logger'; // Import logger
import { authService } from '@/services/api';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await authService.login({ email, password });
      setLocation('/dashboard');
    } catch (error: any) { // Catch as any to access error.message
      logger.error('Failed to login:', { context: 'Login Page', payload: error });
      toast({
        title: 'Error de inicio de sesión',
        description: error.message || 'Verifica tus credenciales y vuelve a intentarlo.', // Use error.message if available
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-pink-50 dark:bg-gray-900">
      <Card className="mx-auto max-w-sm">
        <CardHeader className="space-y-1 text-center">
          <Logo className="w-24 h-24 mx-auto" />
          <CardTitle className="text-2xl font-bold">Welcome to KittyPau</CardTitle>
          <CardDescription>Enter your credentials to access your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button type="submit" className="w-full bg-pink-500 hover:bg-pink-600 text-white">
              Login
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            Don't have an account?{' '}
            <a href="/register" className="text-pink-500 hover:underline">
              Sign up
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}