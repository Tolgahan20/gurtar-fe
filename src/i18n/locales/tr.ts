import { auth } from './tr/auth/auth';
import { categories, favorites, location, navigation, packages, profile } from './tr/common';
import { onboarding } from './tr/onboarding/onboarding';

export const tr = {
  auth,
  onboarding,
  common: {
    location,
    packages,
    favorites,
    navigation,
    categories,
    profile,
  },
} as const; 