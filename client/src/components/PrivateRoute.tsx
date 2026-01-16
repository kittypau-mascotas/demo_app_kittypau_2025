import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLocation } from 'wouter';

export default function PrivateRoute({ component: Component, ...rest }: any) {
  const { user, loading } = useAuth();
  const [, setLocation] = useLocation();

  if (loading) return null;
  if (!user) {
    setLocation('/login');
    return null;
  }
  return <Component {...rest} />;
}