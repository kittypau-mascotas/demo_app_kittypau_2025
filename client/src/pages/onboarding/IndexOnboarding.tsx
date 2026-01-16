import React from 'react';
import { Redirect } from 'wouter';

export default function IndexOnboarding() {
  // This page should ideally not be reached if OnboardingGuard logic is correct.
  // It acts as a fallback or a final redirect to the dashboard if all steps are implicitly done.
  return <Redirect to="/dashboard" />;
}
