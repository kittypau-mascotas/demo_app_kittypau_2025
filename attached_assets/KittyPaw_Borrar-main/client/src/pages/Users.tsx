import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { MoreVertical } from 'lucide-react';

export default function Users() {
  //todo: remove mock functionality
  const mockUsers = [
    {
      id: 1,
      name: 'Admin Principal',
      email: 'admin@kittypaw.com',
      role: 'Administrador',
      status: 'Activo',
      lastLogin: 'Hace 5 minutos',
    },
    {
      id: 2,
      name: 'Usuario Familia',
      email: 'familia@kittypaw.com',
      role: 'Usuario',
      status: 'Activo',
      lastLogin: 'Hace 2 horas',
    },
    {
      id: 3,
      name: 'Invitado',
      email: 'invitado@kittypaw.com',
      role: 'Solo Lectura',
      status: 'Inactivo',
      lastLogin: 'Hace 3 días',
    },
  ];

  return (
    <div className="space-y-6" data-testid="page-users">
      <div className="flex items-center justify-between">
        <h1 className="titulo text-3xl">Usuarios</h1>
        <Button className="btn-primary" data-testid="button-add-user">
          Agregar Usuario
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockUsers.map((user) => (
          <Card key={user.id} className="hover-elevate" data-testid={`card-user-${user.id}`}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarFallback className="bg-chart-2 text-foreground">
                    {user.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </AvatarFallback>
                </Avatar>
                <CardTitle className="text-base">{user.name}</CardTitle>
              </div>
              <Button variant="ghost" size="icon" data-testid={`button-user-menu-${user.id}`}>
                <MoreVertical className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm text-muted-foreground">{user.email}</p>
              <div className="flex items-center gap-2">
                <Badge variant="outline">{user.role}</Badge>
                <Badge className={user.status === 'Activo' ? 'status-active text-white' : 'bg-gray-300'}>
                  {user.status}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground pt-2">Último acceso: {user.lastLogin}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
