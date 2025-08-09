import axios, { AxiosError } from 'axios';
import { useEffect } from 'react';
import { useToast } from '../context/ToastContext';

export function ErrorHandler() {
  const { showToast } = useToast();

  useEffect(() => {
    const handleError = (error: AxiosError) => {
      // Get the error message
      let message = error.message;

      // Handle specific error cases
      if (error.response?.status === 429) {
        message = 'You are making too many requests. Please wait a moment before trying again.';
      } else if (!error.response) {
        message = 'Network error. Please check your connection.';
      } else if (error.response.status === 401) {
        message = 'Your session has expired. Please log in again.';
      } else if (error.response.status === 403) {
        message = 'You do not have permission to perform this action.';
      } else if (error.response.status === 404) {
        message = 'The requested resource was not found.';
      } else if (error.response.status >= 500) {
        message = 'An unexpected error occurred. Please try again later.';
      }

      // Show the error message
      showToast({
        type: 'error',
        message,
        duration: 3000,
      });
    };

    // Add the error interceptor
    const interceptor = axios.interceptors.response.use(
      response => response,
      error => {
        if (axios.isAxiosError(error)) {
          handleError(error);
        }
        return Promise.reject(error);
      }
    );

    // Clean up the interceptor when the component unmounts
    return () => {
      axios.interceptors.response.eject(interceptor);
    };
  }, [showToast]);

  return null;
} 