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
import { BrandCarousel } from '@/components/BrandCarousel';
import logo from '@assets/generated_images/KittyPaw_app_logo_icon_4a2bd296.png';
import { Checkbox } from '@/components/ui/checkbox';

const loginSchema = z.object({
  username: z.string().min(1, 'El nombre de usuario es requerido'),
  password: z.string().min(1, 'La contraseña es requerida'),
});

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const { login } = useAuth();
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: '',
      password: '',
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
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="flex items-center justify-center p-8 lg:p-12">
        <div className="w-full max-w-md space-y-8">
          <div className="space-y-2">
            <h1 className="text-3xl font-semibold tracking-tight" data-testid="text-heading">
              Iniciar Sesión
            </h1>
            <p className="text-muted-foreground">
              Ingresa tus credenciales para acceder a tu cuenta
            </p>
            <div className="p-3 bg-muted/50 rounded-md border border-muted-foreground/20">
              <p className="text-sm text-muted-foreground">
                <strong>Credenciales por defecto:</strong>
              </p>
              <p className="text-sm text-muted-foreground">
                Usuario: <code className="px-1 py-0.5 bg-muted rounded">admin</code>
              </p>
              <p className="text-sm text-muted-foreground">
                Contraseña: <code className="px-1 py-0.5 bg-muted rounded">1234</code>
              </p>
            </div>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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

      <div className="hidden lg:flex items-center justify-center p-12 bg-muted/30">
        <div className="w-full max-w-lg space-y-8">
          <div className="flex flex-col items-center space-y-6">
            <img 
              src={logo} 
              alt="KittyPaw Logo" 
              className="w-20 h-20 object-contain"
              data-testid="img-logo"
            />
            <h2 className="text-4xl font-semibold text-center" data-testid="text-brand-name">
              KittyPaw
            </h2>
          </div>
          
          <BrandCarousel />
        </div>
      </div>
    </div>
  );
}
