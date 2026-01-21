import React from 'react';
import { useSession } from '@/lib/auth-client';
import { Redirect } from 'wouter';
import { Loader2 } from 'lucide-react';

const PrivateRoute = ({ component: Component, ...rest }: { component: React.ComponentType<any>; [key: string]: any }) => {
  const { data: session, isPending } = useSession();

  if (isPending) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!session?.user) {
    return <Redirect to="/login" />;
  }

  return <Component {...rest} />;
};

export default PrivateRoute;