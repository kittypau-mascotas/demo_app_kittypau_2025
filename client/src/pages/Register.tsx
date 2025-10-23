import { useState } from 'react';
import { useLocation } from 'wouter';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import logo from '@assets/generated_images/KittyPaw_app_logo_icon_4a2bd296.png';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const registerSchema = z.object({
  username: z.string().min(3, 'El nombre de usuario debe tener al menos 3 caracteres'),
  email: z.string().email('El correo electrónico no es válido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
});

export default function Register() {
  const [isLoading, setIsLoading] = useState(false); // Keep local loading state for button
  const { register } = useAuth();
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof registerSchema>) => {
    setIsLoading(true);
    try {
      const success = await register(data.username, data.email, data.password);
      if (success) {
        toast({ title: '¡Bienvenido!', description: 'Cuenta creada exitosamente.' });
        setLocation('/dashboard');
      } else {
        toast({ title: 'Error', description: 'No se pudo crear la cuenta', variant: 'destructive' });
      }
    } catch (error) {
      console.error("Registration error:", error); // Log the error for debugging
      let errorMessage = 'No se pudo crear la cuenta';
      if (error instanceof Error) {
        errorMessage = error.message || errorMessage;
      }
      toast({ title: 'Error', description: errorMessage, variant: 'destructive' });
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: 'hsl(var(--background))' }}>
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-3 text-center pb-4">
          <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-2">
            <img src={logo} alt="KittyPaw Logo" className="h-10 w-10" />
          </div>
          <CardTitle className="text-3xl titulo">
            Únete a KittyPaw
          </CardTitle>
          <CardDescription className="text-base">
            Completa el formulario para registrarte
          </CardDescription>
        </CardHeader>
        <CardContent className="px-6 pb-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">Usuario</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="usuario"
                        className="h-10"
                        {...field}
                        disabled={isLoading} // Disable input while loading
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="correo@ejemplo.com"
                        className="h-10"
                        {...field}
                        disabled={isLoading} // Disable input while loading
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
                        className="h-10"
                        {...field}
                        disabled={isLoading} // Disable input while loading
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full h-10 text-base mt-6 btn-primary" disabled={isLoading}>
                {isLoading ? 'Creando cuenta...' : 'Crear Cuenta'}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2 px-6 pb-6">
          <div className="text-sm text-muted-foreground text-center">
            ¿Ya tienes cuenta?{' '}
            <a href="/login" className="text-primary hover:underline font-medium">
              Inicia sesión
            </a>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}