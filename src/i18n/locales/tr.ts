import { auth } from './tr/auth/auth';
import { favorites, location, packages } from './tr/common';
import { onboarding } from './tr/onboarding/onboarding';

export const tr = {
  auth,
  onboarding,
  common: {
    location,
    packages,
    favorites,
  },
} as const; 