import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Redirect } from 'wouter';

const PrivateRoute = ({ component: Component, ...rest }: { component: React.ComponentType<any>; [key: string]: any }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading authentication...</div>;
  }

  if (!user) {
    return <Redirect to="/login" />;
  }

  return <Component {...rest} />;
};

export default PrivateRoute;