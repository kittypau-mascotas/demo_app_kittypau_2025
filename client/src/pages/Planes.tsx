import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check } from 'lucide-react';

export default function Planes() {
  //todo: remove mock functionality
  const plans = [
    {
      name: 'Básico',
      price: '$0',
      period: '/mes',
      description: 'Perfecto para comenzar',
      features: ['1 Mascota', '2 Dispositivos', 'Alertas básicas', 'Soporte por email'],
      current: false,
    },
    {
      name: 'Plus',
      price: '$9.99',
      period: '/mes',
      description: 'Para familias pequeñas',
      features: ['3 Mascotas', '5 Dispositivos', 'Alertas avanzadas', 'Analíticas detalladas', 'Soporte prioritario'],
      current: true,
    },
    {
      name: 'Pro',
      price: '$19.99',
      period: '/mes',
      description: 'Para criadores y profesionales',
      features: [
        'Mascotas ilimitadas',
        'Dispositivos ilimitados',
        'Alertas personalizadas',
        'Analíticas en tiempo real',
        'Soporte 24/7',
        'API access',
      ],
      current: false,
    },
  ];

  return (
    <div className="space-y-6" data-testid="page-planes">
      <div className="text-center">
        <h1 className="titulo text-3xl mb-2">Planes de Suscripción</h1>
        <p className="text-muted-foreground">Elige el plan que mejor se adapte a tus necesidades</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan, index) => (
          <Card
            key={plan.name}
            className={`relative ${index === 1 ? 'border-primary shadow-lg' : ''}`}
            data-testid={`plan-${plan.name.toLowerCase()}`}
          >
            {plan.current && (
              <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 status-active text-white">
                Plan Actual
              </Badge>
            )}
            <CardHeader>
              <CardTitle className="text-2xl">{plan.name}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
              <div className="pt-4">
                <span className="text-4xl font-bold">{plan.price}</span>
                <span className="text-muted-foreground">{plan.period}</span>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary mt-0.5" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button
                className={`w-full ${plan.current ? 'btn-secondary' : 'btn-primary'}`}
                disabled={plan.current}
                data-testid={`button-select-${plan.name.toLowerCase()}`}
              >
                {plan.current ? 'Plan Actual' : 'Seleccionar Plan'}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
