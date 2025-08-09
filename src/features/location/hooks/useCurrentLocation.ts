import * as Location from 'expo-location';
import { useState } from 'react';
import { useLocation } from '../context/LocationContext';

export function useCurrentLocation() {
  const { setCurrentLocation, setIsUsingCurrentLocation } = useLocation();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const requestLocationPermission = async () => {
    setLoading(true);
    setError(null);
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setError('Permission to access location was denied');
        return false;
      }
      return true;
    } catch (err) {
      console.log(err);
      setError('Failed to request location permission');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const getCurrentLocation = async () => {
    setLoading(true);
    setError(null);
    try {
      const hasPermission = await requestLocationPermission();
      if (!hasPermission) return;

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      setCurrentLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
      setIsUsingCurrentLocation(true);
    } catch (err) {
      console.log(err);
      setError('Failed to get current location');
      setIsUsingCurrentLocation(false);
    } finally {
      setLoading(false);
    }
  };

  const stopUsingCurrentLocation = () => {
    setCurrentLocation(null);
    setIsUsingCurrentLocation(false);
  };

  return {
    getCurrentLocation,
    stopUsingCurrentLocation,
    loading,
    error,
  };
} 