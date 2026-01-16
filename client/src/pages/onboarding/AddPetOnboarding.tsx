import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import AddPetModal from '@/components/AddPetModal';
import { useState } from 'react';
import { Redirect, useLocation } from 'wouter';
import { useOnboardingStatus } from '@/hooks/useOnboardingStatus';

export default function AddPetOnboarding() {
  const [showAddPetModal, setShowAddPetModal] = useState(false);
  const { refetch: refetchOnboardingStatus } = useOnboardingStatus();
  const [, setLocation] = useLocation();

  const handlePetAdded = () => {
    refetchOnboardingStatus();
    setShowAddPetModal(false);
    // After adding pet, OnboardingGuard should redirect to link-device or dashboard
    setLocation('/dashboard'); // Temporarily redirect to dashboard, OnboardingGuard will handle the next step
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-pink-50 dark:bg-gray-900 p-4">
      <Card className="mx-auto max-w-lg text-center">
        <CardHeader>
          <CardTitle className="text-3xl">¡Bienvenido a KittyPau!</CardTitle>
          <CardDescription>Para comenzar, necesitamos conocer a tu compañero peludo.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">¡Es hora de añadir a tu primera mascota!</p>
          <Button onClick={() => setShowAddPetModal(true)} className="btn-primary">
            <Plus className="h-4 w-4 mr-2" /> Añadir Mascota
          </Button>
          <AddPetModal isOpen={showAddPetModal} onOpenChange={setShowAddPetModal} onPetAdded={handlePetAdded} />
        </CardContent>
      </Card>
    </div>
  );
}
