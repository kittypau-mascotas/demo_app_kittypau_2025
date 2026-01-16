import { useQuery } from '@tanstack/react-query';

interface OnboardingStatus {
  hasPets: boolean;
  hasDevices: boolean;
  completed: boolean;
}

const fetchOnboardingStatus = async (): Promise<OnboardingStatus> => {
  const response = await fetch('/api/onboarding/status', {
    credentials: 'include',
  });
  if (!response.ok) {
    throw new Error('Failed to fetch onboarding status');
  }
  return response.json();
};

export const useOnboardingStatus = () => {
  return useQuery<OnboardingStatus, Error>({
    queryKey: ['onboardingStatus'],
    queryFn: fetchOnboardingStatus,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: true,
  });
};