import React from 'react';
import { Redirect } from 'wouter';
import { useAuth } from '@/contexts/AuthContext';
import { useOnboardingStatus } from '@/hooks/useOnboardingStatus';

interface OnboardingGuardProps {
  children: React.ReactNode;
}

const OnboardingGuard: React.FC<OnboardingGuardProps> = ({ children }) => {
  const { session, isLoading: isAuthLoading } = useAuth();
  const { data: onboardingStatus, isLoading: isOnboardingStatusLoading } = useOnboardingStatus();

  // If auth is loading, or onboarding status is loading, show loading indicator
  if (isAuthLoading || isOnboardingStatusLoading) {
    return <div className="flex items-center justify-center h-screen">Cargando estado de onboarding...</div>;
  }

  // If not authenticated, redirect to login (AuthGuard should ideally handle this first)
  if (!session) {
    return <Redirect to="/login" />;
  }

  // If onboarding is not completed, redirect to the appropriate onboarding step
  if (onboardingStatus && !onboardingStatus.completed) {
    if (!onboardingStatus.hasPets) {
      // Redirect to a specific page for adding pets
      return <Redirect to="/onboarding/add-pet" />;
    }
    if (!onboardingStatus.hasDevices) {
      // Redirect to a specific page for linking devices
      return <Redirect to="/onboarding/link-device" />;
    }
    // Fallback in case completed is false but hasPets and hasDevices are true (shouldn't happen if backend is correct)
    return <Redirect to="/onboarding" />; 
  }

  // If onboarding is completed, render the children
  return <>{children}</>;
};

export default OnboardingGuard;
