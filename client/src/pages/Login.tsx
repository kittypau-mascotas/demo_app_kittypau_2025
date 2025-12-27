import { useState } from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

import logo from '@assets/generated_images/KittyPau_app_logo_icon_4a2bd296.png';
import { Checkbox } from '@/components/ui/checkbox';
import { Instagram, Youtube, Linkedin, Mail } from 'lucide-react'; // Añadir esta línea

const loginSchema = z.object({
  username: z.string().min(1, 'El nombre de usuario es requerido'),
  password: z.string().min(1, 'La contraseña es requerida'),
});

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const { login } = useAuth();
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: 'admin',
      password: '1234',
    },
  });

  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    setIsLoading(true);
    try {
      const success = await login(data.username, data.password);
      if (success) {
        toast({ title: '¡Bienvenido!', description: 'Has iniciado sesión correctamente.' });
        setLocation('/dashboard');
      } else {
        toast({ title: 'Error', description: 'Credenciales inválidas', variant: 'destructive' });
      }
    } catch (error) {
      toast({ title: 'Error', description: 'Ocurrió un error al iniciar sesión', variant: 'destructive' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4 lg:p-8">
      <div className="w-full max-w-md space-y-2">
        
<div className="flex flex-col items-center space-y-1 bg-white p-4 rounded-lg shadow-md">
          <img 
            src="/kitty-logo.jpg" 
            alt="KittyPau Logo" 
            className="w-24 h-24 object-contain"
            data-testid="img-logo"
          />
          <h2 className="text-2xl font-semibold text-center" data-testid="text-brand-name">
            Kittypau
          </h2>
          <p className="text-base text-muted-foreground text-center">Demo App <span className="text-sm">version _1a</span></p>
          <div className="flex items-center space-x-2 mt-2">
            <a href="https://www.instagram.com/kittypau.mascotas/" target="_blank" rel="noopener noreferrer" className="flex items-center text-sm text-primary hover:underline">
              <Instagram className="h-4 w-4 mr-1" />
              Instagram
            </a>
            <a href="https://www.youtube.com/channel/UCYrN8v3Lb5n1B0L2QeOEcx" target="_blank" rel="noopener noreferrer" className="flex items-center text-sm text-primary hover:underline">
              <Youtube className="h-4 w-4 mr-1" />
              YouTube
            </a>
            <a href="https://www.linkedin.com/in/kittypau-mascotas-26289539a/" target="_blank" rel="noopener noreferrer" className="flex items-center text-sm text-primary hover:underline">
              <Linkedin className="h-4 w-4 mr-1" />
              LinkedIn
            </a>
          </div>
          <div className="flex justify-center mt-2"> {/* Nuevo div para el correo, con margen superior */}
            <a href="mailto:kittypau.mascotas@gmail.com" target="_blank" rel="noopener noreferrer" className="flex items-center text-sm text-primary hover:underline">
              <Mail className="h-4 w-4 mr-1" />
              kittypau.mascotas@gmail.com
            </a>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md space-y-2">
          <div className="space-y-2">
            <h1 className="text-2xl font-semibold tracking-tight text-center" data-testid="text-heading">
              Iniciar Sesión
            </h1>
            <p className="text-sm text-muted-foreground text-center">
              Ingresa tus credenciales para acceder a tu cuenta
            </p>
            
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">Usuario</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="tu_usuario" 
                        {...field} 
                        data-testid="input-username"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">Contraseña</FormLabel>
                    <FormControl>
                      <Input 
                        type="password" 
                        placeholder="••••••••" 
                        {...field} 
                        data-testid="input-password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="remember" 
                    checked={rememberMe}
                    onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                    data-testid="checkbox-remember"
                  />
                  <label
                    htmlFor="remember"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Recordarme
                  </label>
                </div>
                <a 
                  href="#" 
                  className="text-sm text-primary hover:underline"
                  data-testid="link-forgot-password"
                >
                  ¿Olvidaste tu contraseña?
                </a>
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={isLoading}
                data-testid="button-login"
              >
                {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
              </Button>
            </form>
          </Form>
        </div>

        <div className="text-sm text-center text-muted-foreground">
          ¿No tienes cuenta?{' '}
          <a 
            href="/register" 
            className="text-primary hover:underline font-medium" 
            data-testid="link-register"
          >
            Regístrate aquí
          </a>
        </div>
      </div>
    </div>
  );
}
