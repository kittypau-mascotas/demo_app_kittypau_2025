import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import LinkDeviceModal from '@/components/LinkDeviceModal';
import { useState } from 'react';
import { Redirect, useLocation } from 'wouter';
import { useOnboardingStatus } from '@/hooks/useOnboardingStatus';
import { usePets } from '@/hooks/data/usePets'; // To get petId for LinkDeviceModal

export default function LinkDeviceOnboarding() {
  const [showLinkDeviceModal, setShowLinkDeviceModal] = useState(false);
  const { refetch: refetchOnboardingStatus } = useOnboardingStatus();
  const { data: pets, isLoading: isLoadingPets } = usePets(); // Get pets to select one for linking
  const [, setLocation] = useLocation();

  const handleDeviceLinked = async () => {
    // Call backend to update hasDevices status
    await fetch('/api/onboarding/update-status', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ hasDevices: true }),
    });

    refetchOnboardingStatus();
    setShowLinkDeviceModal(false);
    // After linking device, OnboardingGuard should redirect to dashboard
    // setLocation('/dashboard'); // OnboardingGuard will handle the next step
  };

  // For simplicity, link to the first pet found. In a real app, user would select.
  const petIdToLink = isLoadingPets || !pets || pets.length === 0 ? null : pets[0].id;

  return (
    <div className="flex items-center justify-center min-h-screen bg-pink-50 dark:bg-gray-900 p-4">
      <Card className="mx-auto max-w-lg text-center">
        <CardHeader>
          <CardTitle className="text-3xl">¡Casi listo para empezar!</CardTitle>
          <CardDescription>Ahora, vinculemos el dispositivo de tu mascota.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">¡Es hora de conectar tu dispositivo KittyPau!</p>
          <Button onClick={() => setShowLinkDeviceModal(true)} className="btn-primary" disabled={!petIdToLink}>
            <Plus className="h-4 w-4 mr-2" /> Vincular Dispositivo
          </Button>
          {!petIdToLink && !isLoadingPets && (
              <p className="text-sm text-red-500">Necesitas añadir al menos una mascota antes de vincular un dispositivo.</p>
          )}
          <LinkDeviceModal 
            isOpen={showLinkDeviceModal} 
            onOpenChange={setShowLinkDeviceModal} 
            onDeviceLinked={handleDeviceLinked} 
            petId={petIdToLink} 
          />
        </CardContent>
      </Card>
    </div>
  );
}
