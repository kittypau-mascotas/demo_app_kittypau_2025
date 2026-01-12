import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Device } from '@shared/schema'; // Import the Device type from shared schema

export const useDevices = () => {
  const { user } = useAuth();
  const [data, setData] = useState<Device[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchDevices = async () => {
      // If user is not authenticated, do not attempt to fetch devices
      if (!user) {
        setData(null);
        setIsLoading(false);
        setIsError(false);
        setError(null);
        return;
      }

      setIsLoading(true);
      setIsError(false);
      setError(null);
      try {
        const response = await fetch('/api/devices', { credentials: 'include' });
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || `Error ${response.status}`);
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        setIsError(true);
        setError(err instanceof Error ? err : new Error('An unexpected error occurred.'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchDevices();
  }, [user]); // Re-run effect when user changes

  return { data, isLoading, isError, error };
};